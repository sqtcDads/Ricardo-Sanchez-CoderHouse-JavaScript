const linkWiki = "https://es.wikipedia.org/api/rest_v1/page/html/Tres_en_línea?stash=true"

const estadoInicial = {
    juegosJugados: 0,
    cantidadJuegos: 3,
    jugador1Gana: 0,
    jugador2Gana: 0,
    minJuegos: 2,
    rows: 3,
    cols: 3,
    finalizado: false
}

let turno = 'X';



let estadoJuego = {
    ...estadoInicial
}

function guardarEstado() {
    window.localStorage.setItem('estadoJuego', JSON.stringify(estadoJuego))

}

window.onload = () => {
    const estadoGuardado = window.localStorage.getItem('estadoJuego')
    const ganadorTotal = document.getElementById('ganadorTotal')
    const boton = document.getElementById('boton')

    fetchInfo();

    if (estadoGuardado != null) {
        estadoJuego = JSON.parse(estadoGuardado)

        if (estadoJuego.juegosJugados >= 1) {

            document.getElementById("gana1").innerHTML =
                `Juegos ganados: ${estadoJuego.jugador1Gana}`;

            document.getElementById("gana2").innerHTML =
                `Juegos ganados: ${estadoJuego.jugador2Gana}`;
        }


        document.querySelector(`input[id="${estadoJuego.cantidadJuegos}"]`).checked = 'checked';
        if (estadoJuego.juegosJugados == 0) {
            boton.value = 'Iniciar juego'
        }
        else if (estadoJuego.finalizado == true) {
            boton.value = 'Reiniciar juego'

            if (estadoJuego.jugador1Gana > estadoJuego.jugador2Gana) {
                ganadorTotal.innerHTML = 'Gano Rojo!';
            } else {
                ganadorTotal.innerHTML = 'Gano Azul!';
            }
        }
        else { boton.value = 'Siguiente juego' }
    }

    document.querySelectorAll('.cells').forEach((cell, index) => {
        cell.onclick = () => onClickCell(cell, index);
    });

}
function onClickCell(cell, index) {
    cell.innerHTML = turno

    if (turno == 'X') {
        turno = 'O'
    } else {
        turno = 'X'
    }
}



function getRow(index, rows) {
    return Math.floor(index / rows)
}

function getCol(index, cols) {
    return index % cols
}

function reset() {
    const boton = document.getElementById('boton')
    const ganadorTotal = document.getElementById('ganadorTotal')
    estadoJuego = {
        ...estadoInicial
    }
    estadoJuego.cantidadJuegos = +document.querySelector('input[name="juegos"]:checked').value;
    estadoJuego.minJuegos = Math.ceil(estadoJuego.cantidadJuegos / 2);
    guardarEstado()

    boton.value = 'Iniciar juego'
    document.getElementById("gana1").innerHTML = '';
    document.getElementById("gana2").innerHTML = '';
    ganadorTotal.innerHTML = ''


}

function onClickButton() {

    const boton = document.getElementById('boton')
    const ganadorTotal = document.getElementById('ganadorTotal')

    if (estadoJuego.finalizado) {
        reset();
    } else {
        jugar();
        if (estadoJuego.finalizado) {
            boton.value = 'Reiniciar juego'

            if (estadoJuego.jugador1Gana > estadoJuego.jugador2Gana) {
                ganadorTotal.innerHTML = 'Gano Rojo!';
            } else {
                ganadorTotal.innerHTML = 'Gano Azul!';
            }
        }
    }


    guardarEstado()
}

function jugar() {

    boton.value = 'Siguiente juego'
    let ganador = simularJuego();
    if (ganador != 0) {
        estadoJuego.juegosJugados++
    }
    if (ganador === 1) {
        estadoJuego.jugador1Gana++;
    }
    if (ganador === 2) {
        estadoJuego.jugador2Gana++;
    }


    document.querySelectorAll('.cells').forEach(cell => {
        cell.textContent = '';
    });

    document.getElementById("gana1").innerHTML =
        `Juegos ganados: ${estadoJuego.jugador1Gana}`;

    document.getElementById("gana2").innerHTML =
        `Juegos ganados: ${estadoJuego.jugador2Gana}`;


    if (estadoJuego.jugador1Gana === estadoJuego.minJuegos || estadoJuego.jugador2Gana === estadoJuego.minJuegos) {
        estadoJuego.finalizado = true;
    }

    document.querySelectorAll('.cells').forEach(cell => {
        cell.textContent = '';
    });

}


function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function simularJuego() {

    let tablero = [];
    let randomRow = randomNum(0, 2);
    let randomCol = randomNum(0, 2);
    let cells = document.querySelectorAll('.cells');
    let turnodeJugador = 0;
    let espaciosVacios = estadoInicial.rows * estadoInicial.cols;




    for (let i = 0; i < estadoInicial.rows; i++) {
        tablero.push([]);
        for (let j = 0; j < estadoInicial.cols; j++) {
            tablero[i].push(0);
        }
    }

    while (espaciosVacios > 0) {
        randomRow = Math.floor(Math.random() * estadoInicial.rows);
        randomCol = Math.floor(Math.random() * estadoInicial.cols);

        if (tablero[randomRow][randomCol] == 0) {
            tablero[randomRow][randomCol] = Math.floor(Math.random() * 2) + 1;
            espaciosVacios--;


            const ganador = hayGanador(tablero)

            if (ganador != 0) {
                return ganador;

            }
        }

    }

    return 0
}



function hayGanador(tablero) {

    let rows = [
        [tablero[0][0], tablero[0][1], tablero[0][2]],
        [tablero[1][0], tablero[1][1], tablero[1][2]],
        [tablero[2][0], tablero[2][1], tablero[2][2]]
    ]

    let cols = [
        [tablero[0][0], tablero[1][0], tablero[2][0]],
        [tablero[0][1], tablero[1][1], tablero[2][1]],
        [tablero[0][2], tablero[1][2], tablero[2][2]]
    ]

    let diagonal = [
        [tablero[0][0], tablero[1][1], tablero[2][2]],
        [tablero[0][2], tablero[1][1], tablero[2][0]]
    ]

    let lineas = [...rows, ...cols, ...diagonal];

    for (let linea of lineas) {
        const ganadorLinea = revisarLinea(linea)
        if (ganadorLinea != 0)
            return ganadorLinea
    }

    return 0
}



function revisarLinea(linea) {

    if (linea[0] == 1 && linea[1] == 1 && linea[2] == 1)
        return 1
    if (linea[0] == 2 && linea[1] == 2 && linea[2] == 2)
        return 2
    return 0

}


function fetchInfo() {
    fetch(linkWiki)
        .then(response => {
            response.text().then(
                text => { document.getElementById("info").innerHTML = text }
            )
        })
}

