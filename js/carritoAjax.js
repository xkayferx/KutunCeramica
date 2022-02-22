//Estas funciones se activan ni bien se abre la pagina.

$(()=>{
    
    validarProductos(productosCeramico, productos);
    
    renderProducts(productos,contenedorProductos); 
    
    renderCart(getStorage(), contenedorCarrito);
    
});

//Se linkea el json a una constante.

const productosCeramico = "../json/productos.json";

//Se Inicializa la clase Producto.

class Producto {
    constructor(id, nombre, tipo, categoria, precio, img) {
    
        this.id = id;
    
        this.nombre = nombre;
    
        this.tipo = tipo;
    
        this.categoria = categoria;
    
        this.precio = precio;
    
        this.img = img;
    }
}

//Se inicializa el Array productos.

productos =[];

//En la siguiente funcion se clona el contenido del Json al Array productos, para luego ser utilizado en las siguientes funciones.

function validarProductos(productosCeramico, productos) {

    $.get(productosCeramico, function(response, status){

        if(status === 'success') {

            let products = response;

            for (i = 0; i < products.length; i++) {
                
                productos[i] = products[i];
            
            } 

        }
    })
}

const contenedorProductos=document.getElementById("containerProducts");

const contenedorCarrito=$("#containerCart");

//Genera las Cards de los Productos

function renderProducts(productos, etiqueta){

    etiqueta.innerHTML="";

    for(producto of productos){

        etiqueta.innerHTML+= `
        
        <div class="col-sm-12 col-md-3 zoom">

            <div class="card text-center border-top">

                <img src="${producto.img}" class="card-img-top" alt="...">

                <div class="card-body">

                    <h3 class="card-title marked">${producto.nombre}</h3>

                    <h3 class="mb-3 card-text price">$ ${producto.precio}</h3>  

                    <button id="btnAdd${producto.id}"  class="agregar btn btn-primary boton">Añadir al Carrito</button>

                </div>

            </div>

        </div>

        `

        capturaBotonAgregar();

        

    };
}

//Genera el Carrito interactivo

function renderCart(cart, container){

    let totalCompra=0;

    let totalUnidades=0;

    container.html("");

    for(const producto of cart){

        totalCompra+=producto.precio*producto.cantidad;

        container.prepend(`

        <tr class="">

        <td><span id="btnMinus${producto.id}" class="btn"><</span>${producto.cantidad}<span id="btnPlus${producto.id}" class="btn">></span></td>

        <td>${producto.nombre}</td>

        <td>$ ${producto.precio}</td>

        <td>$ ${producto.precio*producto.cantidad}</td>                

        <td><button id="btnDel${producto.id}" class="quitar btn btn-danger">X</button></td>

        </tr>`);
        
        $("#btnDel"+producto.id).on("click", (e)=>{            

            quitar(producto.id);

        });

        $("#btnPlus"+producto.id).on("click", ()=>{

            producto.cantidad++

            setStorage(cart);

            renderCart(cart, container);

        })    

        $("#btnMinus"+producto.id).on("click", ()=>{

            if (producto.cantidad > 1){

                producto.cantidad--

                setStorage(cart);

                renderCart(cart, container);

            }

        })                            

    }

    cart.map(e=>totalUnidades+=e.cantidad)

    container.append(`

    <tr>    

    <th scope="row">${totalUnidades}</th>

    <td colspan="2" class="">Totales</td>

    <td>$ ${totalCompra}</td>

    </tr>`);       

}

function setStorage(array){

    localStorage.setItem("carrito", JSON.stringify(array));

}

function getStorage(){

    return JSON.parse(localStorage.getItem("carrito")) || [];

}


function capturaBotonAgregar(){
    
    const botones = document.getElementsByClassName("agregar");
    
    
    for(const boton of botones){
        
        boton.addEventListener("click", (e)=>{
            
            agregar((e.target.id).substring(6));
            
            eliminarOne();
        
            newContent();
        });
        
    };
    
};

// Agrega Productos al Carrtito

function agregar(id){

    const arrayCarrito=getStorage();

    const prodSelec=productos.find(e=>e.id===id);

    const prodCart={id:prodSelec.id, nombre:prodSelec.nombre, precio:prodSelec.precio, cantidad:1};

    let index=arrayCarrito.findIndex(e=>e.id===id);

    index == -1 ? arrayCarrito.push(prodCart) : arrayCarrito[index].cantidad++;

    setStorage(arrayCarrito);

    renderCart(arrayCarrito, contenedorCarrito);

};

//Quita Productos del Carrito

function quitar(id){

    const arrayFinal=JSON.parse(localStorage.getItem("carrito")).filter(e=>e.id!=id);

    setStorage(arrayFinal);

    renderCart(arrayFinal, contenedorCarrito);
}

// Filtros

$("#filtroMandalas").click((e)=>{

    e.preventDefault();

    const filterCeramica=productos.filter(e=>e.categoria == "mandalas");

    renderProducts(filterCeramica, contenedorProductos);

    eliminarTwo();

    $("#encabezado").append(`<h1 id="titulo">Mándalas</h1>`);

});

$("#filtroTodos").click((e)=>{

    e.preventDefault();

    const filterCeramica=productos.filter(e=>e.tipo == "producto");

    renderProducts(filterCeramica, contenedorProductos);

    eliminarTwo();

    $("#encabezado").append(`<h1 id="titulo">Productos de Cerámica Artesanal</h1>`);

});

$("#filtroUnicos").click((e)=>{

    e.preventDefault()

    const filterCeramica=productos.filter(e=>e.categoria == "unicos");    

    renderProducts(filterCeramica, contenedorProductos);
    
    eliminarTwo();

    $("#encabezado").append(`<h1 id="titulo">Productos de Edición Limitada</h1>`);

});

$("#filtroVajillas").click((e)=>{

    e.preventDefault()

    const filterCeramica=productos.filter(e=>e.categoria == "vajillas");    

    renderProducts(filterCeramica, contenedorProductos);
    
    eliminarTwo();

    $("#encabezado").append(`<h1 id="titulo">Vajillas</h1>`);

});

$("#filtroOfertas").click((e)=>{

    e.preventDefault()

    const filterCeramica=productos.filter(e=>e.categoria == "ofertas");    

    renderProducts(filterCeramica, contenedorProductos);
    
    eliminarTwo();

    $("#encabezado").append(`<h1 class="red" id="titulo">¡¡Ofertas Especiales 15% OFF!!</h1>`);

});

function eliminarTwo (){

    var deleteTwo = document.getElementById("titulo");

    deleteTwo.parentNode.removeChild(deleteTwo);
};

//Botones del Carrito

$("#btnClear").click((e)=>{

    localStorage.clear();

    const arrayCarrito=getStorage();

    setStorage(arrayCarrito);

    renderCart(arrayCarrito, contenedorCarrito);

    eliminarOne();

    checkedContent();

});

$("#btnBuy").click((e)=>{

    localStorage.clear();

    const arrayCarrito=getStorage();

    setStorage(arrayCarrito);

    renderCart(arrayCarrito, contenedorCarrito);

    eliminarOne();

    checkedContent();

});

$("#btnClose").click((e)=>{

    eliminarOne();

    checkedContent();

});

function eliminarOne (){

    var deleteOne = document.getElementById("botonCarrito");

    deleteOne.parentNode.removeChild(deleteOne);
};

function newContent(){

    $("#seccionCarrito").append(`<a class="nav-link active shake" aria-current="page" data-bs-toggle="modal" data-bs-target="#carrito" href="#" id="botonCarrito"><img src="../media/carrito.png" class="icono">Carrito(New!)</a>`)

};

function checkedContent(){

    $("#seccionCarrito").append(`<a class="nav-link active" aria-current="page" data-bs-toggle="modal" data-bs-target="#carrito" href="#" id="botonCarrito"><img src="../media/carrito.png" class="icono">Carrito</a>`)

};

