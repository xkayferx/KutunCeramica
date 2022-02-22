let cuentas = [];

class account{

    constructor(user, password, mail){

        this.user = user;

        this.password = password;

        this.mail = mail;

    }

}

//elimina el formulario de registro

function eliminarOne (){

    var deleteOne = document.getElementById("formOne");

    deleteOne.parentNode.removeChild(deleteOne);
}

//elimina el formulario de ingreso

function eliminarTwo (){

    var deleteTwo = document.getElementById("formTwo");

    deleteTwo.parentNode.removeChild(deleteTwo);
}

// genera formulario de registro con id="formOne"

function registrar (cuentas){

    let formulario = document.createElement('form');
    
    formulario.id = 'formOne';

    formulario.class = 'forms'
    
    formulario.innerHTML = `
    
    <input placeholder='ingrese el nombre de usario' type='text'></input>
    
    <input placeholder='ingrese su contraseña' type='text'></input>
    
    <input placeholder='ingrese su e-mail' type='text'></input>
    
    <button type='submit'>Registrarse</button>
    
    <button type='reset'>¿Ya tienes Sesion?</button>
    
    `;
    
    document.getElementById("session").appendChild(formulario);
    
    formulario.onsubmit = function(event){
        
        event.preventDefault();
        
        const inputs = event.target.children;
        
        cuentas.push(new account({user: inputs[0].value, password: inputs[1].value, mail: inputs[2].value,}));

        bienvenidoOne(cuentas);
        
        localStorage.setItem('miCuenta', JSON.stringify(cuentas));
        
    }
    
    formulario.onreset = function(event){
        
        event.preventDefault();
        
        iniciar(cuentas);
        
    }

}

//genera un mensaje diciendo que el usario se ah registrado correctamente

function bienvenidoOne(cuentas){

    let divOne = document.createElement('div');

    divOne.id = 'welcomeone';

    for(account of cuentas){
        
        divOne.innerHTML = `
        
            <p>Bienvenido ${account.user}, tu cuenta ah sido registrada</p>
            
        `;

    };


    document.getElementById("session").appendChild(divOne);

    eliminarOne();
}

// se genera un formulario de inicio de Sesion con id="formTwo"

function iniciar (cuentas){

    eliminarOne();

    var cuentax = localStorage.getItem('miCuenta');

    oldCuenta = JSON.parse(cuentax);

    let formularioTwo = document.createElement('form');
    
    formularioTwo.id = 'formTwo';

    formularioTwo.class = 'forms'
    
    formularioTwo.innerHTML = `
    
    <input placeholder='ingrese el nombre de usario' type='text'></input>
    
    <input placeholder='ingrese su contraseña' type='text'></input>
    
    <button type='submit'>Iniciar Sesion</button>
    
    <button type='reset'>¿No tienes sesion? ¡Registrate Ya!</button>
    
    `;
    
    document.getElementById("session").appendChild(formularioTwo);
    
    formularioTwo.onsubmit = function(event){
        
        event.preventDefault();
        
        const inputs = event.target.children;

        
        let correct = 0;
        
        for (let index = 0; index < oldCuenta.length; index++){
        
            let oldUser = account.user[index];
    
            let oldPassword = account.password[index];

            if ((inputs[0].value = oldUser) && (inputs[1].value = oldPassword)){

                index = oldCuenta.length;
                
                correct = 2;
            }
        }

        if (correct < 1){

            bienvenidoTwo(cuentas);

        }else{

            cuentaIncorrect(cuentas);

        }

    }
    
    formularioTwo.onreset = function(event){
        
        event.preventDefault();

        registrar(cuentas);

        eliminarTwo();
        
    }

}

//se genera un mensaje alertando al usuario que ah iniciado sesion correctamente

function bienvenidoTwo(cuentas){

    let divTwo = document.createElement('div');

    divTwo.id = 'welcomeone';

    for(account of cuentas){
        
        divTwo.innerHTML = `
        
            <p>Bienvenido ${account.user}, haz iniciado sesion</p>
            
        `;

    };


    document.getElementById("session").appendChild(divTwo);

    eliminarTwo();
}

//se genera un mensaje alertando al usuario que no se ah iniciado las sesin correctamente

function cuentaIncorrect(cuentas){

    let divThree = document.createElement('div');

    divThree.id = 'unwelcome';

    divTwo.innerHTML = `
        
        <p>¡Contraseña y/o Usuario Incorrecto/s!</p>

    `;

    document.getElementById("session").appendChild(divThree);

    eliminarTwo();

    iniciar(cuentas);
}

//Main Code

registrar(cuentas);