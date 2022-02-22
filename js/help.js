$(()=> {
    
    //impide que se recargue la pagina al enviar un formulario, lo oculta con un fadeOut y crea un mensaje atravez del DOM.

    $('#help').on('submit', function(e) {

        e.preventDefault();

        $.ajax({

            success: function (data) { $('#help').fadeOut(
                

                function(){

                $('#answer').append(`<h3 class="centerText">Su consulta ah sido enviado con exito</h3>`)

            })}

        });

    });

});
