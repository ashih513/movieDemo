let Validator = require('validatorjs');

const MovieValidation = (body, req, res) =>{
    let rules = {
        title : 'required',
        publishYear : 'required|numeric|digits:4',
        image : 'required',
    };
    let validation = new Validator(body, rules);
    return validation;
}

module.exports = MovieValidation;