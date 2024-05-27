const jwt = require('jsonwebtoken')
require('dotenv').config()

const authMiddleware = (req, res, next) => {
    console.log(req.headers)
    const token = req.headers.authorization
    
    const validTok = token.split(' ')
    console.log(token, validTok)
    if (!validTok) {
        return res.status(401).json({
            message: 'No Token Provided'
        })
    }

    try {
        //Cuando es validod pasa a la siguiente funcion
        const validToken = jwt.verify(validTok[1], process.env.TOP_SECRET)
        //Decodifica el token y verifica los datos del usuario.
        req.userData = validToken
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid Token'
        })
    }
}

module.exports = authMiddleware