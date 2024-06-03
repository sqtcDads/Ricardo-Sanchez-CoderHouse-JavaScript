function getPlayerData(player) {
    return {
        name: document.getElementById(`nombre${player}`).value,
        color: document.getElementById(`color${player}`).value,
    };
}

function onStart() {
    //! Obtener el nombre y color del jugador 1

    const nombre1 = document.getElementById("nombre1").value;
    const color1 = document.getElementById("color1").value;

    //! Obtener el nombre y color del jugador 2

    const nombre2 = document.getElementById("nombre2").value;
    const color2 = document.getElementById("color2").value;


    //! Obtener cantidad de juegos

    const juegos = document.querySelector('input[name="juegos"]:checked').value;
    let minJuegos = Math.ceil(juegos / 2);

    // Iniciamos el simulacro
    // iterar por la cantidad de juegos hasta que uno gane
    // ganador => 0,1,2
    // 0 => nadie ha ganado
    // 1 => gano 1
    // 2 => gano 2

    let jugador1Gana = 0;
    let jugador2Gana = 0;

    while (jugador1Gana + jugador2Gana <= juegos) {
        let ganador = simularJuego(); // 1 o 2
        if (ganador === 1) {
            jugador1Gana++;
        } else {
            jugador2Gana++;
        }
        if (jugador1Gana === minJuegos || jugador2Gana === minJuegos) {
            break;
        }
    }

    //! Mostrar el ganador

    let ganadorTotal = 0;

    if (jugador1Gana > jugador2Gana) {
        ganadorTotal = 1;
    } else {
        ganadorTotal = 2;
    }

    //todo String interpolation ?

    document.getElementById("ganadorTotal").innerHTML =
        `Felicidades ${ganadorTotal}` + " ganaste!";
}

function simularJuego() {
    const random = Math.random();
    if (random <= 0.5) return 1;
    return 2;
}
