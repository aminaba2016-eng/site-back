const {check, validationResult} = require ("express-validator")


exports.registerRules = () =>[
    check("name","name is raquired").notEmpty(),
    check("lastName","lastName is raquired").notEmpty(),
    check("email","email is raquired").notEmpty(),
    check("email","check email again").isEmail(),
    check("password","this field should be at least 8 char").isLength({
        min:6,
        max:20,
    }),
];


exports.loginRules = () =>[
    check("email","email is raquired").notEmpty(),
    check("email","check email again").isEmail(),
    check("password","this field should be at least 8 char").isLength({
        min:6,
        max:20,
    }),
];

exports.validation = (req, res, next) =>{
const errors = validationResult(req);
if(! errors.isEmpty()){
    return res.status(400).send({
        errors: errors.array().map((el) => 
        ({msg: el.msg,})),
    })
} 
next();
}