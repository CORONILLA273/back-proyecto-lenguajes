//EN ESTE ARCHIVO VAMOS A TENER LA ENCRIPTACION DE LA CONTRASEÑA
//Y CREAMOS EL TOKEN CUANDO SE REGISTRA
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { createUser, findUserByEmail, getAllUsers, deleteUser, updateUser } = require('../services/userService')
const { createStudent, findStudentByEmail, getAllStudents, deleteStudent, updateStudent } = require('../services/studentService')


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

// Función para registrar a un estudiante
exports.registrarEstudiante = async (req, res) => {
    try {
        // Codigo para registrarse
        const { nameStu, classStu, genderStu, emailStu, phoneStu, passwordStu, ageStu, id } = req.body
        const existingUser = await findStudentByEmail(emailStu)
        if (existingUser.success) {
            return res.status(400).json({
               message: 'El estudiante ya esta registrado'
            })
         }
  
        const saltRounds = 10
        const hashedPasswordStu = await bcrypt.hash(passwordStu, saltRounds)
  
        const newStudent = {
			name: nameStu,
			classStu: classStu,
			gender: genderStu,
            email: emailStu,
			phone: phoneStu,
            password: hashedPasswordStu,
			age: ageStu,
            id: id
            //Agregar otros campos, esto tambien se hace en el modelo.
        }
		console.log('@@ newStudent => ', newStudent)

		const StudentResult = await createStudent(newStudent)
		console.log('@@@ result => ', StudentResult)
		if (StudentResult.success) {
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

exports.getAllStudents = async (req, res) => {
	try {
		const students = await getAllStudents()
		res.status(200).json({
			message: 'Success',
			student
		})
	} catch (error) {
		res.status(500).json({
			message: 'Server Error Getting all Students',
			error: error.message
		})
	}
}

exports.updateStudent = async (req, res) => {
	try {
		const studentId = req.params.id
		const studentData = req.body
		await updateStudent(studentId, studentData)
		res.status(200).json({
			message: 'Student updated successfully'
		})
	} catch (error) {
		res.status(500).json({
			message: 'Error updating Student',
			error: error.message
		})
	}
}

exports.deleteStudent = async (req, res) => {
	try {
		const studentId = req.params.id
		await deleteStudent(studentId)
		res.status(200).json({
			message: 'Student deleted successfully'
		})
	} catch (error) {
		res.status(500).json({
			message: 'Error deleting student',
			error: error.message
		})
	}
}