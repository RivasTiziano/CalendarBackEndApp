const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()


const { validateJWT } = require('../middlewares/validateJWT');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { fieldValidators } = require('../middlewares/fieldValidators');


// Endpoints de auth

//* host + /api/auth/register
router.post('/register',
    [   // middlewares
        check('username', 'The name is needed').not().isEmpty(),
        check('email', 'The email is needed').not().isEmpty(),
        check('password', 'The password is needed').not().isEmpty(),
        check('email', 'Introduce a correct email').isEmail(),
        check('password', 'The password must has more than 6 and less than 20 characters').isLength({ min: 6, max: 20 }),
        fieldValidators
    ], 
    createUser );


//* host + /api/auth
router.post('/',
    [   // middlewares
        check('email', 'The email is needed').not().isEmpty(),
        check('email', 'Introduce a correct email').isEmail(),
        check('password', 'The password is needed').not().isEmpty(),
        fieldValidators
    ], loginUser);


//* host + /api/auth/revalidate
router.get('/revalidate', validateJWT, revalidateToken);


module.exports = router;