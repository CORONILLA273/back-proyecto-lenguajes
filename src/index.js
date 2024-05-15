const express = require('express')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('./routes/authRoutes')
const app = express()
const PORT = process.env.PORT || 6010

app.use(cors())
app.use(express.json())

//Esto es para que pongamos la ruta que queramos que responda.
app.use('/api/auth', authRoutes)


//Aqui encendemos el servidor, ponerlo que escuche
app.listen(PORT, () => {
    console.log(`Server running in: ${PORT}`)
})