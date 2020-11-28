const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const puerto = 3000;

const server = express();
server.use(helmet());
const jwtClave = "miClaveDel2020_genial";


server.use(expressJwt({ secret: jwtClave, algorithms:["HS512"] }).unless({ path: ["/usuarios/login/" , "/usuarios/"] }));


const limiteLogin = rateLimit({
    windowMs: 6 * 60 * 10000,
    max: 10 // Puse 10, pero me permite solo 8
});

server.use("/usuarios/login/", limiteLogin); // solo aplicamos al Login

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const usuarios = [
	{
		id: "1",
		usuario: "Leandrito",
		contrasena: "123",
		nombre: "Leandro",
		apellido: "Mugnolo",
		admin: true
	},
	{
		id: "2",
		usuario: "Matias",
		contrasena: "123",
		nombre: "Matias",
		apellido: "Szeftel",
		admin: true


	}

];

function validarEmail(req, res, next) {

	console.log("Usuario quiere registrase");
	const email = req.body.email;

	if (!email) {

		res.status(404).json({
			error: `Debe Enviar Email`
		});

	} else {

		if (usuarios.find(u => u.email == email)) {
			res.status(404).json({
				error: `${email} ya existe en la base de datos`
			});
		} else if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
			next();
		} else {
			res.status(404).json({
				error: `La direccion de Correo : ${email} es Incorrecta`
			})
		}

	}

}


function validarEdad(req, res, next) {

	const edad = req.body.edad;

	if (edad > 18) {

		if (edad % 1 == 0) {
			next()
		} else {
			res.status(404).json({
				error: 'Debe Introducir un numero entero en la edad'
			});
		}

	} else {

		res.status(404).json({
			error: 'Debe Ser mayor de edad para registarse'
		});

	}
}

function validarContrasena(req, res, next) {
	const contrasena = req.body.password;
	const contrasena2 = req.body.password2;

	if(contrasena != contrasena2){

		res.status(404).json({
			error: 'Las contraseñas deben ser iguales'
		});

	} else if(contrasena.length >= 5){

	next();

	} else{

		res.status(404).json({
			error: 'Las contraseñas deben ser Mayor a 5 Caracteres'
		});

	}
}



server.get("/usuarios", (req, res) => {
	res.status(200).json(usuarios);
});

server.post("/usuarios/login/", (req, res) => {

	const { usuario, contrasena } = req.body;

    const usuBus = usuarios.find(usr => usr.usuario == usuario );


	if ( usuBus && usuario == usuBus.usuario && contrasena == usuBus.contrasena ) {

		const userToken = jwt.sign({
			id: usuBus.id,
			nombre: usuBus.nombre,
			apellido: usuBus.apellido
		}, jwtClave, {
			algorithm: "HS512",
			expiresIn: 1200 // tiempo de expiracion en segundos
		});

		// 
		res.status(200).json({
			 nombre: usuBus.nombre ,
			 apellido: usuBus.apellido ,
			 admin : usuBus.admin,
			 token:  userToken });
	} else {
		res.status(401).json({ error: "usuario o contrasena incorrecta" });
	}
});


server.post("/usuarios/", validarEmail, validarEdad, validarContrasena, (req, res) => {

	const { nombre, apellido, edad, email, password, password2 } = req.body;

	const nuevoUsuario = {
		nombre,
		apellido,
		edad,
		email,
		password
	}

	usuarios.push(nuevoUsuario);

	res.status(200).json({
		mensaje: `Bienvenid@ al sitio ${nombre}`
	});
});


server.listen(puerto, () => {

	console.clear();
	console.log(`Servidor iniciado en el Puerto ${puerto}`);

});