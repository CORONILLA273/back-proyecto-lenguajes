//EN ESTE ARCHIVO VAMOS A TENER LA ENCRIPTACION DE LA CONTRASEÑA
//Y CREAMOS EL TOKEN CUANDO SE REGISTRA
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { createUser, findUserByEmail, getAllUsers, deleteUser, updateUser } = require('../services/userService')

exports.signup = async (req, res) => {
    try {
        // Codigo para registrarse
        const { email, password, id } = req.body
        const existingUser = await findUserByEmail(email)
        if (existingUser.success) {
            return res.status(400).json({
               message: 'El usuario ya esta registrado'
            })
         }
  
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
  
        const newUser = {
            email: email,
            password: hashedPassword,
            id: id
            //Agregar otros campos, esto tambien se hace en el modelo.
        }

		const userResult = await createUser(newUser)
		//console.log('@@@ result => ', userResult)
		if (userResult.success) {
			res.status(201).json({
				message: 'Usuario Registrado Satisfactoriamente'
			})
		} else {
			res.status(500).json({
				message: 'Error al registrar usuario'
			})
		}
	} catch (error) {
		res.status(500).json({
				message: error.message
		})
	}
}

exports.login = async (req, res) => {
	try {
		// Codigo para loggearnos
		const { email, password } = req.body
		const findEmail = await findUserByEmail(email)

		if (!findEmail.success) {
			res.status(401).json({
				message: 'Usuario no encontrado' //Mandamos especificamente el error al front
			})
		}
		const user = findEmail.user
		// console.log('@@@ controller => ', password, user.password)
		const findPassword = await bcrypt.compare(password, user.password)
		// console.log('@@@ findPassword => ', findPassword)

		if (!findPassword) {
			return res.status(401).json({
				message: 'Password Incorrecto' //Mandamos especificamente el error al front
			})
		}
		
		//Aqui generamos el token, este token va a incluir la informacion del usuario
		const token = jsonwebtoken.sign({
			email: user.email,
			userId: user.id
		}, process.env.TOP_SECRET, {
			expiresIn: '1h'
		})
		console.log('@@ token => ', token)
		res.status(200).json({
			token: token
		})
	} catch (error) {
		res.status(500).json({
				message: error.message
		})
	}
}


exports.getAllUsers = async (req, res) => {
	try {
		const users = await getAllUsers()
		res.status(200).json({
			message: 'Success',
			users
		})
	} catch (error) {
		res.status(500).json({
			message: 'Server Error Getting all Users',
			error: error.message
		})
	}
}

exports.updateUser = async (req, res) => {
	try {
		const userId = req.params.id
		const userData = req.body
		await updateUser(userId, userData)
		res.status(200).json({
			message: 'User updated successfully'
		})
	} catch (error) {
		res.status(500).json({
			message: 'Error updating user',
			error: error.message
		})
	}
}

exports.deleteUser = async (req, res) => {
	try {
		const userId = req.params.id
		await deleteUser(userId)
		res.status(200).json({
			message: 'User deleted successfully'
		})
	} catch (error) {
		res.status(500).json({
			message: 'Error deleting user',
			error: error.message
		})
	}
}