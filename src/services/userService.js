const bcrypt = require('bcrypt')
//Los modelos se ponen en mayuscula
const jwt = require('jsonwebtoken')
const { createUser, findUserByEmail } = require('../models/userModel')
//Con lo siguiente le estamos diciendo que vamos a acceder a las variables de entorno de desarrrollo
require('dotenv').config()


// El modelo es el constructor de todas las operaciones
// En el modelo debe de existir todas las operaciones que tenemos aqui


exports.createUser = async (userData) => {
    try {
        const createdUser = await createUser(userData)
        //Si existe la variable de arriba, quiere decir que si se creo el usuario
        if(createdUser) {
            return {
                success: true
            }
        }
        return {
            success: false,
            message: 'Error al registrar'
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
}

exports.findUserByEmail = async (email) => {
    try {
        const found = await findUserByEmail(email)
        //Si existe la variable de arriba, quiere decir que si se creo el usuario
        if(found.success) {
            return {
                success: true,
                user: found.user
            }
        }
        return {
            success: false,
            message: 'Usuario No Encontrado.'
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
}

exports.comparePasswords  = async (plainPassword, hashedPassword) => {
    try {
        const verifyPassword = await bcrypt.compare(plainPassword, hashedPassword)
        //Va a comparar el password que le llega y hashed password
        // y se retorna, pero la variable retornable solo dira si es verdadero o falso.
        return verifyPassword
    } catch (error) {
        throw new Error('Error al comparar passwords')
    }
}


// Este me sirve para guardar info de algun usuario y que tiene
// un tiempo de vida, esto nos ayuda para el front para cuando quiera
// cambiar de rutas, tenga los permisos necesarios para hacerlo.
exports.generateToken = async (user) => {
    try {
        const token = jwt.sign({
                //Esto es la informacion que va a llevasr el token.
                email: user.email,
                userId: user.id
            },
            process.env.TOP_SECRET,
            { expiresIn: '1h' }
        ) 
    } catch (error) {
        throw new Error('Error al generar el token ME QUEDE EN 26:35 11 ABRIL')
    }
}