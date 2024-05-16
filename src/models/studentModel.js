const firebase = require('../config/firebase')
//En esta constante voy a gurdar toda las colecciones que se tienen de los usuarios.
const studentCollection = firebase.firestore().collection('students')

exports.createStudent = async (userData) => {
	try {
		  const student = await studentCollection.doc(userData.id).set(userData)
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

  exports.findStudentById = async (userId) => {
	try {
		//Esto es para ver si dentro de la coleccion encontramos algun documento que tenga ya el id del user
		const studentFound = await studentCollection.doc(userId).get()
		if (studentFound.exists) {
			return {
				success: true,
				student: studentDoc.data()
			}
		} else {
			return {
				success: false,
				error: 'User not Found'
			}
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}

exports.findStudentByEmail = async (email) => {
	//console.log('@@ model => ', email)
	try {
		//Lo que hace esto es que va a intentar algun usuarios dentro de la coleccion
		// que el correo electronico sea igual al que se esta mandando.
		const studentEmail = await studentCollection.where('emailStu', '==', email).get()
		if (!studentEmail.empty) {
			const studentFound = studentEmail.docs[0]
			return {
				success: true,
				student: studentFound.data()
			}
		} else {
			return {
				success: false,
				error: 'Student not Found'
			}
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}


exports.getAllStudents = async () => {
	try {
		const allStudents = await studentCollection.get()
		const students = []
		allStudents.forEach((doc) => {
			students.push(doc.data())
		})
		return students
	} catch (error) {
		throw new Error('Error getting students: ' + error.message)
	}
}

exports.deleteStudent = async (userId) => {
	try {
		await studentCollection.doc(userId).delete()
	} catch (error) {
		throw new Error('Error deleting student' + error.message)
	}
}

exports.updateStudent = async (userId, userData) => {
	try {
		await studentCollection.doc(userId).update(userData)
	} catch (error) {
		throw new Error('Error updating student' + error.message)
	}
}