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
router.post('/registrar-estudiante', /*authMiddleware,*/authController.registrarEstudiante)
router.get('/get-all-student', authMiddleware, authController.getAllStudents)
router.delete('/delete-student/:id', /*authMiddleware,*/ authController.deleteStudent)
router.put('/update-student/:id', authMiddleware, authController.updateStudent)

// Rutas para cada acción que se requiere del profesor
router.post('/registrar-profesor', /*authMiddleware,*/ authController.registrarProfesor)
router.get('/get-all-teachers',/*authMiddleware,*/ authController.getAllTeachers)
router.delete('/delete-teachers/:id', /*authMiddleware,*/ authController.deleteTeacher)
router.put('/update-teachers/:id', authMiddleware, authController.updateTeacher)

//Exportarlo para que se pueda ocupar en otro lugar.
module.exports = router
