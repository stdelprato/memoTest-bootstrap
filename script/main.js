const cartaTapadaStyle = "background-image: url(./dorso-carta.png); background-size: cover;"
let coordenadasCartas = [[0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11], [12, 13, 14, 15, 16, 17]];
let cartasClickeadas = [];
let cartasDisponibles = ["red", "blue", "purple", "green", "black", "pink", "yellow", "aqua", "white"];
let cartasUsadasProv = [];
let puntaje = 0;

repartirCartas();
manejarClickUsuario();

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
    } else if (cartasClickeadas.length == 2 && cartasClickeadas[0].name == cartasClickeadas[1].name){
        puntaje++;
        cartasClickeadas = [];
        desbloquearInput();
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

