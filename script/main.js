const cartaTapadaStyle = 'background-image: url("./dorso-carta.png"); background-size: cover;'
const $minutos = document.querySelector(".minutos");
const $segundos = document.querySelector(".segundos");
const $intentos = document.querySelector(".intentos-numero");
let cartasClickeadas = [];
let cartasDisponibles = ["red", "blue", "purple", "green", "black", "pink", "yellow", "aqua", "white"];
let cartasUsadasProv = [];
let timerMemotest;
let intentos = 0;
let minutos;
let segundos;

document.querySelector("#boton-empezar").onclick = manejarPartida;
document.querySelector("#boton-reiniciar").onclick = resetear;

function manejarPartida(){
    mostrarUnCachoLasCartas();
    repartirCartas();
    ocultarBotonNombre("empezar");
    mostrarBotonNombre("reiniciar");
    setTimeout(function(){
        manejarClickUsuario();
        empezarTimer();
    }, 2000);
}

function resetear(){
    cartasDisponibles = ["red", "blue", "purple", "green", "black", "pink", "yellow", "aqua", "white"];
    cartasUsadasProv = [];
    cartasClickeadas = [];
    $intentos.textContent = intentos = 0;
    $minutos.textContent = minutos = "00";
    $segundos.textContent = segundos = "00";

    document.querySelectorAll(".carta").forEach(function(carta){
        taparCarta(carta);
    })

    sacarleColorCartas();

    ocultarBotonNombre("reiniciar");
    mostrarBotonNombre("empezar");

    cortarTimer(timerMemotest);

    bloquearInput();
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

function sacarleColorCartas(){
    const $cartas = document.querySelectorAll(".carta");

    $cartas.forEach(function(carta){
        carta.className = "carta";
    })
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
    minutos = 0;
    segundos = 0;
    
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
            cartasClickeadas = [];
            desbloquearInput();
        }, 700);

        intentos++;
        $intentos.textContent = intentos;
    } else if (cartasClickeadas.length == 2 && cartasClickeadas[0].name == cartasClickeadas[1].name){
        intentos++;
        $intentos.textContent = intentos;
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

function mostrarBotonNombre(boton){
    document.querySelector(`#boton-${boton}`).classList.remove("oculto");
}

function ocultarBotonNombre(boton){
    document.querySelector(`#boton-${boton}`).classList.add("oculto");
}

// function crearRow(n){
//     const $crearRow = document.createElement("div");
//     const $container = document.querySelector(".container")
//     $crearRow.classList.add("row");
//     $crearRow.classList.add(`row-numero-${n}`);
//     $crearRow.classList.add("d-flex");

//     $container.appendChild($crearRow);
// }

// function crearCarta(){
//     const $crearDiv = document.createElement("div");
//     $crearDiv.classList.add("col-2");
//     $crearDiv.classList.add("carta");

//     return $crearDiv;
// }

