const btnLogin = document.querySelector('.btnLogin');
const btnTransferir = document.querySelector('.btnTransferir');
const usuario = document.querySelector('.usuario').value;
const contrasena = document.querySelector('.password').value;
const email = document.querySelector('.email').value;
const from = document.querySelector('#from').value;
const to = document.querySelector('#to').value;
const amount = document.querySelector('#amount').value;
const url = 'http://127.0.0.1:3000';

btnLogin.addEventListener('click', async (e) => {

    e.preventDefault();
    
    console.log("hola",JSON.stringify({"Envio user": usuario, "pass": contrasena}));
    
    try {
            const userData = await fetch( url + '/usuarios/login', { 
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({"username":usuario,"password":contrasena
            })
             });
        } catch (err) {
            alert(err);
        }

})

btnTransferir.addEventListener('click', async (e) => {

    e.preventDefault();
        
    console.log("Envio Dinero",JSON.stringify({"from": from, "to": to, "amount":amount}));
    
    try {
            const userData = await fetch( url + '/transferencias/', { 
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({"from": 1, "to": 2, "amount":100})
             });
        } catch (err) {
            alert(err);
        }

})

