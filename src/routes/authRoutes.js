const express = require('express') //Express es el servidor wed, es el que tiene las peticiones y las respuestas
const router = express.Router()

const authController = require('../controllers/authController')