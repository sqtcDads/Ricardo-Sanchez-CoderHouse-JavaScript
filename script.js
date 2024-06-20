

const estadoInicial = {
    juegosJugados: 0,
    cantidadJuegos: 0,
    jugador1Gana: 0,
    jugador2Gana: 0,
    minJuegos: 0,
    finalizado: false
}

let estadoJuego = {
    ...estadoInicial
}


function reset() {
    const boton = document.getElementById('boton')
    const ganadorTotal = document.getElementById('ganadorTotal')
    estadoJuego = {
        ...estadoInicial
    }
    boton.value = 'iniciar juego'
    document.getElementById("gana1").innerHTML = '';
    document.getElementById("gana2").innerHTML = '';
    ganadorTotal.innerHTML = ''
}


function onClickButton() {

    estadoJuego.cantidadJuegos = document.querySelector('input[name="juegos"]:checked').value;
    estadoJuego.minJuegos = Math.ceil(estadoJuego.cantidadJuegos / 2);

    const boton = document.getElementById('boton')
    const ganadorTotal = document.getElementById('ganadorTotal')


    if (estadoJuego.finalizado) {
        reset();
    } else {
        jugar();
        if (estadoJuego.finalizado) {
            boton.value = 'reiniciar juego'

            if (estadoJuego.jugador1Gana > estadoJuego.jugador2Gana) {
                ganadorTotal.innerHTML = 'Gano Rojo!';
            } else {
                ganadorTotal.innerHTML = 'Gano Azul!';
            }

        }
    }
}



function jugar() {

    estadoJuego.juegosJugados++
    boton.value = 'siguiente juego'
    let ganador = simularJuego();
    if (ganador === 1) {
        estadoJuego.jugador1Gana++;
    }
    if (ganador === 2) {
        estadoJuego.jugador2Gana++;
    }

    document.getElementById("gana1").innerHTML =
        `Juegos ganados: ${estadoJuego.jugador1Gana}`;

    document.getElementById("gana2").innerHTML =
        `Juegos ganados: ${estadoJuego.jugador2Gana}`;

    if (estadoJuego.jugador1Gana === estadoJuego.minJuegos || estadoJuego.jugador2Gana === estadoJuego.minJuegos) {
        estadoJuego.finalizado = true;
    }

}

function simularJuego() {
    const random = Math.random();
    if (random <= 0.5) return 1;
    return 2;
}

//! trablero (?)
let tablero = [];
const rows = 3;
const cols = 3;

for (let i = 0; i < rows; i++) {
    tablero.push([]);
    for (let j = 0; j < cols; j++) {
        tablero[i].push(0);
    }
}

for (let i = 0; i < rows * cols; i++) {
    let randomRow = randomNum(0, 2);
    let randomCol = randomNum(0, 2);

    while (true) {
        if (tablero[randomRow][randomCol] == 0) {
            break;
        }
        randomCol = randomNum(0, 2);
        randomRow = randomNum(0, 2);


    }
    tablero[randomRow][randomCol] = i % 2 ? 1 : 2;

}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

console.log(tablero)

let seleccionarColor = 0;

