const btnLogin = document.querySelector('.btnLogin');
const btnRegistrar = document.querySelector('.btnRegistrar');
const btnTransferir = document.querySelector('.btnTransferir');
const btnTransferencias = document.querySelector('.btnTransferencias');
const btnSalir = document.querySelector('.btnSalir');
const url = 'http://127.0.0.1:3000';

const fetcheo = async (url, ext, cuerpo, metodo) => {

    const respuesta = await fetch(url + ext, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(cuerpo)
    });

    data = await respuesta.json();
    return await data;

}

btnLogin.addEventListener('click', async (e) => {

    e.preventDefault();

    const usuario = document.querySelector('.usuario').value;
    const contrasena = document.querySelector('.password').value;

    //console.log("Envio :", JSON.stringify({ "username": usuario, "password": contrasena }));

    try {
        const ext = '/usuarios/login/';
        const cuerpo = {
            "usuario": usuario,
            "contrasena": contrasena
        };
        const metodo = 'POST';

        let ingreso = await fetcheo(url, ext, cuerpo, metodo);
  
        if (ingreso.token) {

            $("#btnLogin").addClass("btn-warning").removeClass("btn-success");
            $("#btnLogin").prop('disabled', true);
            $("#btnLogin").html(`Bienvenid@ al sitio ${ingreso.nombre}`);
            $(".btnTransferir").prop('disabled', false);
            $(".btnTransferencias").prop('disabled', false);

            localStorage.setItem("token", JSON.stringify(ingreso.token));
            localStorage.setItem("nombre", JSON.stringify(ingreso.nombre));

            setTimeout(function () {
                $('#login').modal('hide');
                $(".btnIngreso").prop('disabled', true);
                $(".btnRegistro").prop('disabled', true);
            }, 1000);

        } else {
            alert(ingreso.error);
        }

    } catch (err) {

    }


});

btnRegistrar.addEventListener('click', async (e) => {

    e.preventDefault();
    const nombre = document.querySelector('.nuevoNombre').value;
    const apellido = document.querySelector('.nuevoApellido').value;
    const edad = document.querySelector('.nuevaEdad').value;
    const email = document.querySelector('.emailRegistro').value;
    const password = document.querySelector('.nuevoPassword').value;
    const password2 = document.querySelector('.nuevoPassword2').value;

    try {

        const ext = '/usuarios/';
        const cuerpo = {
            "nombre": nombre,
            "apellido": apellido,
            "edad": edad,
            "email": email,
            "password": password,
            "password2": password2
        };

        const metodo = 'POST';

        let registro = await fetcheo(url, ext, cuerpo, metodo);

        if (registro.mensaje) {

            $(".btnRegistrar").addClass("btn-warning").removeClass("btn-success");
            $(".btnRegistrar").prop('disabled', true);
            $(".btnRegistrar").html('Registrado !!');

            setTimeout(function () {
                $('#registro').modal('hide');
                $(".btnRegistrar").prop('disabled', true);
            }, 2000);

        } else if (registro.error) {
            alert(registro.error);
        }


    } catch (err) {

    }


});


btnSalir.addEventListener('click', async (e) => {
    e.preventDefault();
    localStorage.clear();
    $(".btnIngreso").prop('disabled', false);
    $(".btnRegistro").prop('disabled', false);
    $(".btnTransferir").prop('disabled', true);
    $(".btnTransferencias").prop('disabled', true);
});

document.addEventListener("DOMContentLoaded", function (event) {
    
    if (localStorage.getItem("token") !== null) {
        
        $(".btnIngreso").prop('disabled', true);
        $(".btnRegistro").prop('disabled', true);
        $(".btnTransferir").prop('disabled', false);
        $(".btnTransferencias").prop('disabled', false);
        
        setTimeout(function () {

            $('#usuarioBienvenida').text(localStorage.getItem("nombre"));
            $('#bienvenida').modal('show');
                        
        }, 500);

    } else {

        $(".btnTransferir").prop('disabled', true);
        $(".btnTransferencias").prop('disabled', true);
        $('#login').modal('show');

    }


});
