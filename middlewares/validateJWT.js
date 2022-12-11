const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res = response, next ) => {

    // x-token headers
    const token = req.header('x-token');
    
    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion.'
        });
    }

    try {
        
        const { uid, username } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.username = username;

    } catch (error) {
        
        console.log(error);

        return res.status(401).json({
            ok: false,
            msg: 'Token no valido.'
        });
    }

    next();

}

module.exports = {
    validateJWT
}