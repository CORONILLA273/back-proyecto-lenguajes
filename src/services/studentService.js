const bcrypt = require('bcrypt')
//Los modelos se ponen en mayuscula
const { createStudent, findStudentByEmail, getAllStudents, deleteStudent, updateStudent } = require('../models/studentModel')
//Con lo siguiente le estamos diciendo que vamos a acceder a las variables de entorno de desarrrollo
require('dotenv').config()


// El modelo es el constructor de todas las operaciones
// En el modelo debe de existir todas las operaciones que tenemos aqui

exports.createStudent = async (userData) => {
	console.log('@@ studentData => ', userData)
	try {
		const createdStudent = await createStudent(userData)
		//Si existe la variable de arriba, quiere decir que si se creo el usuario
		//console.log('@@@ service => ', createdUser)
		if (createdStudent.success) {
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

exports.findStudentByEmail = async (email) => {
	//console.log('@@ email => service => ', email)
	try {
		const found = await findStudentByEmail(email)
		//Si existe la variable de arriba, quiere decir que si se creo el usuario
		if (found.success) {
			return {
				success: true,
				student: found.student
			}
		}
		return {
			success: false,
			message: 'Estudiante No Encontrado'
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}

exports.comparePasswords = async (plainPassword, hashedPassword) => {
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



exports.getAllStudents = async () => {
	try {
		const students = await getAllStudents()
		return students
	} catch (error) {
		throw new Error('Error Getting Students: ' + error.message)
	}
}

exports.deleteStudent = async (userId) => {
	try {
		await deleteStudent(userId)
	} catch (error) {
		throw new Error('Error Deliting Student' + error.message)
	}
}

exports.updateStudent = async (userId, userData) => {
	try {
		await updateStudent(userId, userData)
	} catch (error) {
		throw new Error('Error Updating Student' + error.message)
	}
}