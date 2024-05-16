const firebase = require('../config/firebase')
//En esta constante voy a gurdar toda las colecciones que se tienen de los usuarios.
const teachersCollection = firebase.firestore().collection('teachers')

exports.createTeacher = async (userData) => {
	try {
		  const teacher = await teachersCollection.doc(userData.id).set(userData)
		  //console.log('@@ modelo => ', student)
		  return {
			  success: true
		  } 
	  } catch (error) {
		  return {
			  success: false,
			  error: error.message
		  }
	  }
  }

  exports.findTeacherById = async (userId) => {
	try {
		//Esto es para ver si dentro de la coleccion encontramos algun documento que tenga ya el id del user
		const TeacherFound = await teachersCollection.doc(userId).get()
		if (TeacherFound.exists) {
			return {
				success: true,
				teacher: teacherDoc.data()
			}
		} else {
			return {
				success: false,
				error: 'teacher not Found'
			}
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}

exports.findTeacherByEmail = async (email) => {
	//console.log('@@ model => ', email)
	try {
		//Lo que hace esto es que va a intentar algun usuarios dentro de la coleccion
		// que el correo electronico sea igual al que se esta mandando.
		const teacherEmail = await teachersCollection.where('emailTea', '==', email).get()
		if (!teacherEmail.empty) {
			const teacherFound = teacherEmail.docs[0]
			return {
				success: true,
				teacher: teacherFound.data()
			}
		} else {
			return {
				success: false,
				error: 'Teacher not Found'
			}
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}


exports.getAllTeachers = async () => {
	try {
		const allTeachers = await teachersCollection.get()
		const teachers = []
		allTeachers.forEach((doc) => {
			teachers.push(doc.data())
		})
		return teachers
	} catch (error) {
		throw new Error('Error getting teachers: ' + error.message)
	}
}

exports.deleteTeacher = async (userId) => {
	try {
		await teachersCollection.doc(userId).delete()
	} catch (error) {
		throw new Error('Error deleting teacher' + error.message)
	}
}

exports.updateTeacher = async (userId, userData) => {
	try {
		await teachersCollection.doc(userId).update(userData)
	} catch (error) {
		throw new Error('Error updating teacher' + error.message)
	}
}