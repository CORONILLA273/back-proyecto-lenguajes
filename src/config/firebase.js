//Aqui contiene todo lo que va a contener mi base de datos.
const admin = require('firebase-admin') //Esta variable va a hacer la conexion con todo lo de firebase
const serviceAccount = require('./serviceAccountKey.json') //importamos el archivo de la conexion de la base de datos

//esto es para 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports= admin
