
 
$(document).ready(function () {


    $(".tituloJuego").hide() 
    $(".contenedorOpciones").hide()
    $("#videoFondo").on("ended", function () {
        $(this).fadeOut(500, function () { 
            $("#imagenFinal").css("display", "flex").hide().fadeIn(500);
            $(".tituloJuego").hide().fadeIn(500)
            $(".contenedorOpciones").hide().fadeIn(500)
        });
    });


    let reproductor = $("#reproductor")[0];
    reproductor.volume = 0; 
    
    let playPromise = reproductor.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log("Reproducción automática permitida");
 
        }).catch(error => {
            console.log("Autoplay bloqueado, esperando interacción del usuario");
    
            $(document).one("click", function () {
                reproductor.play();
                reproductor.volume = 0;
            });
        });
    }
    
    //volumen manual
    $("#volumenMusica").on("input", function () {
        reproductor.volume = $(this).val();
    });
    
})