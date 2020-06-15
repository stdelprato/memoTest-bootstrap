const cartaTapadaStyle = 'background-image: url("./dorso-carta.png"); background-size: cover;'
let coordenadasCartas = [[0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11], [12, 13, 14, 15, 16, 17]];
let cartasClickeadas = [];
let cartasDisponibles = ["red", "blue", "purple", "green", "black", "pink", "yellow", "aqua", "white"];
let cartasUsadasProv = [];
let puntaje = 0;
let timerMemotest;
let intentos = 0;

document.querySelector(".boton-empezar").onclick = manejarPartida;

function manejarPartida(){
    mostrarUnCachoLasCartas();
    repartirCartas();
    setTimeout(function(){
        manejarClickUsuario();
        empezarTimer();
    }, 2000);
}

function ganar(){
    bloquearInput();
    clearInterval(timerMemotest);
}

function chequearPartidaGanada(){
    let arrayCartasRestantes = [];
    document.querySelectorAll(".carta").forEach(function(carta){
        if(carta.getAttribute("style") == cartaTapadaStyle){
            arrayCartasRestantes.push(carta);
        }
    })
    if(arrayCartasRestantes.length == 0){
        ganar();
    }
}

function mostrarUnCachoLasCartas(){
    const $cartas = document.querySelectorAll(".carta");
    $cartas.forEach(function(carta){
        mostrarCarta(carta);
    })
    setTimeout(function(){
        $cartas.forEach(function(carta){
            taparCarta(carta);
        })
    }, 2000)
}

function repartirCartas(){
    for(let i = 0; i < 9; i++){
        let colorRandom = cartasDisponibles[Math.floor(Math.random() * cartasDisponibles.length)];

            for(let i = 0; i < 2; i++){
                let numeroCartaRandom = Math.floor(Math.random() * 18);
                
                if(!cartasUsadasProv.includes(numeroCartaRandom)){
                    document.querySelector(`#carta-${numeroCartaRandom}`).classList.add(colorRandom);
                    document.querySelector(`#carta-${numeroCartaRandom}`).name = colorRandom;
                } else {
                    i--;
                }

                cartasUsadasProv.push(numeroCartaRandom);
            }

        cartasDisponibles.splice(cartasDisponibles.indexOf(colorRandom), 1);
    }
}

function empezarTimer() {
    const $minutos = document.querySelector(".minutos");
    let minutos = 0;
    const $segundos = document.querySelector(".segundos");
    let segundos = 0;
    
    timerMemotest = setInterval(function(){
        segundos++;
        if(segundos < 10){
            $segundos.textContent = "0" + segundos;
        } else if(segundos > 59){
            $segundos.textContent = segundos = "00";
            minutos++;
            if(minutos < 10){
                $minutos.textContent = "0" + minutos;
            } else {
                $minutos.textContent = minutos;
            }
        } else {
            $segundos.textContent = segundos;
        }
    }, 1000)
}

function cortarTimer(timer){
    clearInterval(timer);
}

function chequearCartasClickeadas(){
    if(cartasClickeadas.length == 2 && cartasClickeadas[0].name != cartasClickeadas[1].name){
        bloquearInput();

        setTimeout(function(){
            taparCarta(cartasClickeadas[0]);
            taparCarta(cartasClickeadas[1])
        }, 700);

        setTimeout(function(){
            cartasClickeadas = [];
            desbloquearInput();
        }, 701);
        intentos++;
        document.querySelector(".intentos-numero").textContent = intentos;
    } else if (cartasClickeadas.length == 2 && cartasClickeadas[0].name == cartasClickeadas[1].name){
        intentos++;
        document.querySelector(".intentos-numero").textContent = intentos;
        cartasClickeadas = [];
        desbloquearInput();
        chequearPartidaGanada();
    }
}

function manejarClickUsuario(){
    document.querySelectorAll(".carta").forEach(function($carta){
        $carta.onclick = manejarCartasElegidas;
    })
}

function manejarCartasElegidas(event){
    const carta = event.target;
    mostrarCarta(carta);
    cartasClickeadas.push(carta);
    chequearCartasClickeadas();
}

function mostrarCarta(carta){
    carta.style = "";
}

function taparCarta(carta){
    carta.style = cartaTapadaStyle;
}

function bloquearInput(){  
    document.querySelectorAll(".carta").forEach(function($carta){
        $carta.onclick = "";
    })
}

function desbloquearInput(){
    manejarClickUsuario();
}

function crearRow(n){
    const $crearRow = document.createElement("div");
    const $container = document.querySelector(".container")
    $crearRow.classList.add("row");
    $crearRow.classList.add(`row-numero-${n}`);
    $crearRow.classList.add("d-flex");

    $container.appendChild($crearRow);
}

function crearCarta(){
    const $crearDiv = document.createElement("div");
    $crearDiv.classList.add("col-2");
    $crearDiv.classList.add("carta");

    return $crearDiv;
}

