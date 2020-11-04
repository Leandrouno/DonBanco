const btnLogin = document.querySelector('.btnLogin');
const btnTransferir = document.querySelector('.btnTransferir');
const btnTransferencias = document.querySelector('.btnTransferencias');
const usuario = document.querySelector('.usuario').value;
const contrasena = document.querySelector('.password').value;
const email = document.querySelector('.email').value;



const url = 'http://127.0.0.1:3000';

btnLogin.addEventListener('click', async (e) => {

    e.preventDefault();
    
    console.log("Login",JSON.stringify({"Envio user": usuario, "pass": contrasena}));
    
    try {
            const userData = await fetch( url + '/usuarios/login', { 
                method: 'post',
                mode: 'no-cors',
                body: JSON.stringify({'username':usuario,'password':contrasena})
             });
        } catch (err) {
            alert(err);
        }

})

btnTransferir.addEventListener('click', async (e) => {

    e.preventDefault();
    const desde = document.querySelector('.from').value;
    const hasta = document.querySelector('.to').value;
    const monto = document.querySelector('.amount').value;

    console.log("Envio Dinero",JSON.stringify({"from": desde, "to": hasta, "amount": monto}));
    
    try {
            const userData = await fetch( url + '/transferencias/', { 
                method: 'post',
                mode: 'no-cors',
                body: JSON.stringify({"from": desde, "to": hasta, "amount": monto})
             });
        } catch (err) {
            alert(err);
        }

})

btnTransferencias.addEventListener('click', async (e) => {

    e.preventDefault();
    
    try {
            const userData = await fetch( url + '/saldo', { 
                method: 'get',
                mode: 'no-cors'
             });
        } catch (err) {
            alert(err);
        }
       // console.log(userData);
})