window.onload=inici;
var imagenes=["limon.png", "manzana.png", "mora.png", "naranja.png","platano.png","sandia.png"]
var credito;
var orden=[];
var cajas=[];
var sonidos=["final.mp3","florirflorir.mp3","ganar.mp3","lanzar.mp3","otra.wav","sistemaapagado.mp3"]
var audio1;
var audio2;


function inici(){        
    creditoInicial();
    for (let k=0; k<3;k++){
        document.querySelectorAll(".boton")[k].onclick=tirar;
        }
    document.querySelector("#lanzar").onclick=botonGrande;
    document.getElementById("cruz").onclick=cruz;
    document.getElementById("gratis").onclick= creditogratis;
}


function creditogratis(){
    credito+=10;
    actualizarCredito();
}


function sonido(a){
    audio1=document.getElementById("audio");
    audio1.src=`audios/${a}`;
    audio1.play();
}


function tirar(){   
    credito-=1;

   if (credito>0){
        let botones=this.parentNode.children; 
        sonido(sonidos[4]);
    for (let k=0; k<3; k++)
    if(this==botones[k]){
        comun(k);
        }
        actualizarCredito();
        hasganado();
    } else if (credito==0){
        actualizarCredito();
        derrota();
    } 

}



function botonGrande(){
    credito-=1;

    if (credito>0){
        sonido(sonidos[3]);
        for (let k=0; k<3; k++){
        comun(k);
        }
        actualizarCredito();
        hasganado();
    }else if (credito==0){
        actualizarCredito();
        derrota();
    } 
}


function comun(a){
    var ventanaimg=document.querySelectorAll(".ventana img");

    if (orden.length==imagenes.length){
        orden=[];
        ventanaimg[a].innerHTML="";
    }
    do {
        azar=Math.floor(Math.random()*imagenes.length);
    } while (orden.indexOf(azar)>=0);
        orden.push(azar);
        ventanaimg[a].src=`img/${imagenes[azar]}`;
        cajas.splice[a];
        cajas[a]=azar;
}


function creditoInicial(){
    credito=Math.floor((Math.random()*(15-10))+10);  
    actualizarCredito();
}


function actualizarCredito(){
    var monedas=document.querySelector("#monedas");

    monedas.innerHTML="";
    for (k=0; k<credito; k++){
        monedas.insertAdjacentHTML("beforeend", `<img src="img/corazon.png">`)
    }
    document.getElementById("dinero").innerHTML= `<div>${credito}</div>`;
}


function derrota(){
    var audio2=document.getElementById("audio2");
    abrirVelo();       
    document.getElementById("cuadro_mensaje").insertAdjacentHTML('afterbegin', `<div id="mensaje"> Te has quedado sin vidas </div><br><div id="calavera"><img src="img/pngwing.png" height="50px"></div>`);
    audio2.src=`audios/final.mp3`;
    audio2.play();
}


function hasganado(){
    var audio2=document.getElementById("audio2");
    if (cajas[0]==cajas[1] && cajas[1]==cajas[2]){
    abrirVelo();    
    ganado();
    audio2.src=`audios/ganar.mp3`;
    audio2.play();
    }
}


function ganado(){   
    var mensaje= document.getElementById("mensaje");

    mensaje.innerHTML="";
    premio=Math.floor((Math.random()*(5-1))+1);
    //alert(premio);
    credito+=premio;
    mensaje.insertAdjacentHTML('afterbegin', ` has ganado ${premio} monedas<br><br>`);
    for (k=0; k<premio; k++){
        mensaje.innerHTML+=`<img src="img/corazon.png" height="30px">`;
    }
}


function cerrarVelo(){
    document.getElementById("velo").style.display="none";
    document.getElementById("mensaje").innerHTML="";
    document.getElementById("audio2").pause();
}


function abrirVelo(){
    document.getElementById("velo").style.display="flex";
}
    

function cruz(){
    cerrarVelo();
    actualizarCredito();
}

