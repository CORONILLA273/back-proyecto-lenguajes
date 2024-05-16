const bcrypt = require('bcrypt')
//Los modelos se ponen en mayuscula
const { createTeacher, findTeacherByEmail, getAllTeachers, deleteTeacher, updateTeacher } = require('../models/teacherModel')
//Con lo siguiente le estamos diciendo que vamos a acceder a las variables de entorno de desarrrollo
require('dotenv').config()


// El modelo es el constructor de todas las operaciones
// En el modelo debe de existir todas las operaciones que tenemos aqui

exports.createTeacher = async (userData) => {
	console.log('@@ teacherData => ', userData)
	try {
		const createdTeacher = await createTeacher(userData)
		//Si existe la variable de arriba, quiere decir que si se creo el usuario
		//console.log('@@@ service => ', createdUser)
		if (createdTeacher.success) {
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

exports.findTeacherByEmail = async (email) => {
	//console.log('@@ email => service => ', email)
	try {
		const found = await findTeacherByEmail(email)
		//Si existe la variable de arriba, quiere decir que si se creo el usuario
		if (found.success) {
			return {
				success: true,
				teacher: found.teacher
			}
		}
		return {
			success: false,
			message: 'Profesor No Encontrado'
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



exports.getAllTeachers = async () => {
	try {
		const teachers = await getAllTeachers()
		return teachers
	} catch (error) {
		throw new Error('Error Getting Teachers: ' + error.message)
	}
}

exports.deleteTeacher = async (userId) => {
	try {
		await deleteTeacher(userId)
	} catch (error) {
		throw new Error('Error Deliting Teacher' + error.message)
	}
}

exports.updateTeacher = async (userId, userData) => {
	try {
		await updateTeacher(userId, userData)
	} catch (error) {
		throw new Error('Error Updating Teacher' + error.message)
	}
}