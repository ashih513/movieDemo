let Validator = require('validatorjs');

const LoginValidation = (body, req, res) =>{
    let rules = {
        email : 'required',
        password : 'required',
    };
    let validation = new Validator(body, rules);
    return validation;
}

module.exports = LoginValidation;