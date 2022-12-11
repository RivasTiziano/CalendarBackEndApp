const { Router } = require('express')
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { getEvents, createEvents, updateEvents, deleteEvents } = require('../controllers/events');
const { fieldValidators } = require('../middlewares/fieldValidators');
const { validateJWT } = require('../middlewares/validateJWT');
const router = Router()


// Todas tenen que validar jwt
router.use( validateJWT );


// Obtener Eventos

//* host + /api/events
router.get( '/', getEvents );

//* host + /api/events
router.post(
    '/',
    [
        check('title', 'Title is obligatory').not().isEmpty(),
        check('start', 'Start Date is obligatory').custom( isDate ),
        check('start', 'Start Date is obligatory').custom( isDate ),
        fieldValidators
    ],
    createEvents 
);

//* host + /api/events/:id
router.put(
    '/:id',
    [
        check('title', 'Title is obligatory').not().isEmpty(),
        check('start', 'Start Date is obligatory').custom( isDate ),
        check('start', 'Start Date is obligatory').custom( isDate ),
        fieldValidators
    ], 
    updateEvents
);

//* host + /api/events/:id
router.delete(
    '/:id',
    [
        
    ], 
    deleteEvents
);



module.exports = router;

