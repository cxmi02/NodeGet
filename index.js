// 1. componente esencial para construir aplicaciones y APIs web en Node.js.
const express = require('express');


// 2. interactuar con bases de datos MongoDB desde Node.js.
const mongoose = require('mongoose');


// 3. establecer una conexión con la base de datos MongoDB
mongoose.connect(`mongodb+srv://sepulvedagiraldocamila:IAw9xmtt7wXcTtIL@db-1.idpnodb.mongodb.net/`);


// 4. almacena la conexión a la base de datos MongoDB a través de Mongoose
const db = mongoose.connection;


// 5. garantiza que cualquier propiedad o método que intente utilizar dentro de la función esté disponible y se comporte como se espera.

// 5.1 escucha una vez
db.on(`error`, console.error.bind(console, `error de coneccion a la base de datos`));

// 5.2 escucha continuamente
db.once(`open`, function(){
    console.log(`coneccion a la base de datos`);

    // esquema define la estructura de los documentos en una colección de MongoDB.
    userShema = mongoose.Schema({
        nombre: String,
        apellidos: String
    });

    empresaShema = mongoose.Schema({
        nombre: String,
        apellidos: String
    });

    // esta indicando a Mongoose que este modelo estará asociado a la colección 'users' en tu base de datos MongoDB.
    const User = mongoose.model(`usuarios`, userShema);
    const Empresa = mongoose.model(`empresa`, empresaShema);

    // Crea una instancia de la aplicación Express
    const app = express();

    // Configura un middleware en la aplicación para analizar las solicitudes entrantes con formato JSON
    app.use(express.json());

    // esta ruta GET devuelve todos los usuarios almacenados en la base de datos cuando se realiza una solicitud GET a la ruta /api/users
    app.get(`/api/users`, async(req, res) => {
        const users = await User.find();
        res.json(users);
 
    });

    app.get(`/api/users/limit`, async(req, res) => {
        const users = await User.find().limit(10);
        res.json(users);
 
    });

    app.get(`/api/users/country/Bangladesh`, async(req, res) => {
        const users = await User.find({pais: {$eq: "Bangladesh"}});
        res.json(users);
    });

    app.get(`/api/companies`, async(req, res) => {
        const empresa = await Empresa.find();
        res.json(empresa);
 
    });

    app.get(`/api/companies/5`, async (req, res) => {
        try {
            const empresa = await Empresa.find({id: {$eq: 5}});
            res.json(empresa);     
        } catch (error) {
            
        }
 
    });

    // no existe pero cambio el nombre para hacer la practica
    app.get(`/api/companies/city/Bayerborough`, async (req, res) => {
        try {
            const empresa = await Empresa.find({ciudad: {$eq: "Bayerborough"}});
            res.json(empresa);     
        } catch (error) {
            
        }
 
    });

    // inicia tu servidor Express y lo hace escuchar en el puerto 3000.
    app.listen(3000, () => {
        console.log(`servidor escuchando en el puerto 3000`);
    });
});




