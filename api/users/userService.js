const User = require('./user');
const validator = require("email-validator");

User.methods(['get', 'post', 'put', 'delete']);

User.updateOptions({new: true, runValidators: true});

User.before('post', validateEmail)
    .before('put', validateEmail)

function validateEmail(req, res, next){
    let email = req.params.email
    if(!validator.validate(email)){
        res.statusCode = 400;
        return res.json({ errors: ["Invalid email"] });
    } else {
        next()
    }
}

module.exports = User