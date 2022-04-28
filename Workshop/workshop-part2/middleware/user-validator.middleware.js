const Joi = require("joi");

const userSchema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(2).required(),
    age: Joi.number().min(14).max(99).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(10).required(),
});

const userValidator = (req, res, next) => {
    const userData = req.body;
    const validation = userSchema.validate(userData);
    
    if(validation?.error){
        res.status(400).send({
            msg: validation.error.details[0].message,
        });
    }else{
        next();
    }
};

module.exports = userValidator