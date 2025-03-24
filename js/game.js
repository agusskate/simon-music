
$(document).ready(function () {

    //controlador de volumen
    let reproductor = $("#reproductor")[0];
    reproductor.volume = 0; 
    
    let playReproductor = reproductor.play();
    
    if (playReproductor !== undefined) {
        playReproductor.then(() => {
            console.log("Reproducción automática permitida");
 
        }).catch(error => {
            console.log("Autoplay bloqueado, esperando interacción del usuario");
    
            $(document).one("click", function () {
                reproductor.play();
                reproductor.volume = 0;
            });
        });
    }
    
 
    $("#volumenMusica").on("input", function () {
        reproductor.volume = $(this).val();
    });
 

    $(document).ready(function () {
        const colores = ["verde", "rojo", "azul", "amarillo", "morado", "rosa", "naranja", "celeste"];
        let secuenciaJuego = [];
        let secuenciaJugador = [];
        let nivel = 0;
        let esperandoRespuesta = false;
    
        $(".start").click(iniciarJuego);
    
        function iniciarJuego() {
            secuenciaJuego = [];
            secuenciaJugador = [];
            nivel = 0;
 
            siguienteNivel();
        }
    
        function siguienteNivel() {
            nivel++;
            secuenciaJugador = [];
            esperandoRespuesta = false;
            $("#estadoJuego").text(`Nivel ${nivel}`);
    
            let colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
            secuenciaJuego.push(colorAleatorio);
    
            mostrarSecuencia(secuenciaJuego);
        }
    
        //iluminar los botones de colores en el orden correcto
        function mostrarSecuencia(secuencia) {
            let indice = 0;
            esperandoRespuesta = false;
    
            function resaltarSiguiente() {
                //mientras que indice sea menor a la longitud de secuencia seguirá iluminando
                if (indice < secuencia.length) {
                    //IMPORTANTE esto hace que se ilumine el color añadiendo y quitando la clase
                    let boton = $(`.botonColor.${secuencia[indice]}`);
                    boton.addClass("resaltado");
    
                    setTimeout(() => {
                        boton.removeClass("resaltado");
                        indice++;
                        setTimeout(resaltarSiguiente, 500);
                    }, 800);
                } else {
                    $("#estadoJuego").text("Repite el baile");
                    esperandoRespuesta = true;
                }
            }
            resaltarSiguiente();
        }
    
        //interacción del usuario con los botones (colores)
        $(".botonColor").click(function () {
            if (!esperandoRespuesta) return;
    
            let colorSeleccionado = $(this).data("color");
    
            if (secuenciaJugador.length >= secuenciaJuego.length) return;
    
            secuenciaJugador.push(colorSeleccionado);
    
            let indiceActual = secuenciaJugador.length - 1;
            if (secuenciaJugador[indiceActual] !== secuenciaJuego[indiceActual]) {
                $("#estadoJuego").text("Fallaste");
            
                let boton = $(".botonDecorativo");
                boton.addClass("error"); 
            
                setTimeout(() => {
                    boton.removeClass("error"); 
                }, 1900);
            
                esperandoRespuesta = false;
                setTimeout(iniciarJuego, 2000);
                return;
            }
    
            if (secuenciaJugador.length === secuenciaJuego.length) {
                esperandoRespuesta = false;
                $("#estadoJuego").text("Siguiente nivel");
                setTimeout(siguienteNivel, 1000);
            }
        });
    });
    
})