const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

//Ahora vamos a poner las rutas, para cada cosa como borrar, modificar, registrar, etc.

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/get-allusers', authMiddleware, authController.getAllUsers)
router.delete('/:id', authMiddleware, authController.deleteUser)
router.put('/:id', authMiddleware, authController.updateUser)

// Rutas para cada acción que se requiere del estudiante
router.post('/registrar-estudiante', authController.registrarEstudiante)
router.get('/get-all-student', authMiddleware, authController.getAllStudents)
router.delete('/delete-student/:id', authMiddleware, authController.deleteStudent)
router.put('/update-student/:id', authMiddleware, authController.updateStudent)

//Exportarlo para que se pueda ocupar en otro lugar.
module.exports = router
