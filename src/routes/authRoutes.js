const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

//Ahora vamos a poner las rutas, para cada cosa como borrar, modificar, registrar, etc.

router.post('/signup', authController.signup)
router.post('/login', authController.login)

//Exportarlo para que se peuda ocupar en otro lugar.
module.exports = router
