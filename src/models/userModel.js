const firebase = require('../config/firebase')
//En esta constante voy a gurdar toda las colecciones que se tienen de los usuarios.
const usersCollection = firebase.firestore().collection('users')

exports.createUser = async (userData) => {
	try {
			await usersCollection.doc(userData.id).set(userData)
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

exports.findUserById = async (userId) => {
	try {
			//Esto es para ver si dentro de la coleccion encontramos algun documento que tenga ya el id del user
			const userFound = await usersCollection.doc(userId).get()
			if (userFound.exists) {
					return {
							success: true,
							user: userDoc.data()
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

exports.findUserByEmail = async (email) => {
	try {
			//Lo que hace esto es que va a intentar algun usuarios dentro de la coleccion
	// que el correo electronico sea igual al que se esta mandando.
			const userEmail = await usersCollection.where('email', '==', email).get()
			if (!userEmail.empty) {
					const userFound = userEmail.docs[0]
					return {
							success: true,
							user: userFound.data()
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
