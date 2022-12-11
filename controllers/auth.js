const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');



//- Create User Endpoint
const createUser = async(req, res) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'The email is used.'
            })
        }


        user = new User( req.body );

        //this Encripta contraseña
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync( password, salt )


        await user.save();

        //this genera JWT 
        const token = await generateJWT( user.id, user.username )

        res.status(201).json({
            ok: true,
            msg: `User has been registered.`,
            uid: user.id,
            username: user.username,
            token
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Contact the admin' 
        });

    }

}

//- Login User Endpoint
const loginUser = async(req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect Credentials (0)'
            })
        }

        //this confirma el password con el encriptado
        const validPassword = bcrypt.compareSync( password, user.password )

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect Credentials (1)'
            })
        }

        const token = await generateJWT( user.id, user.username )

        res.json({
            ok: true,
            uid: user.id,
            username: user.username,
            token
        })
        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Contact the admin' 
        });

    } 

}

//- Revalidate User Endpoint
const revalidateToken = async(req, res) => {

    const { uid, username } = req

    const token = await generateJWT( uid, username )
    
    res.json({
        ok: true,
        msg: 'user revalidate',
        uid,
        username,
        token
    })

}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}