$(()=>{
    
    revelar();
    
});

//esta Funcion revela aquellos elementos ocultados con la clase ".ocultar" a medida que uno realiza un "ScrollDown" en la pagina 

function revelar() {
    
    $(window).scroll( function(){
    
        $('.ocultar').each( function(i){
            
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_object ){
                
                $(this).animate({'opacity':'1'},1500);
                    
            }
            
        }); 
    
    });
    
};