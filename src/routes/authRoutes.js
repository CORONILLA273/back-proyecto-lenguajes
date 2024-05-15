const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

//Ahora vamos a poner las rutas, para cada cosa como borrar, modificar, registrar, etc.

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/get-allusers', authMiddleware, authController.getAllUsers)
router.delete('/delete-user/:id', authMiddleware, authController.deleteUser)
router.put('/update-user/:id', authMiddleware, authController.updateUser)


//Exportarlo para que se pueda ocupar en otro lugar.
module.exports = router
