const {check, validationResult} =require('express-validator')

exports.registerRules = () =>[

check('name','This fieldis required').notEmpty(),
check('adress','This fieldis required').notEmpty(),
check('telephone','This fieldis required').notEmpty(),
check('telephone', 'This is not a valid phone number').isLength({ min: 8,max :8  }),
check('telephone', 'The phone number must be a number').isNumeric(),
check('email','This fieldis required').notEmpty(),
check('email','This is not a valid email').isEmail(),
check('password','This fieldis required').notEmpty(),
check('password','This is not a valid password').isLength({min : 4}),

];







exports.validator = (req,res,next) => {
    const errors = validationResult(req);
  
    errors.isEmpty() ? next() : res.status(400).json({ errors: errors.array() });
};