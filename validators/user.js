const validate = require('validator');
const _ = require('lodash');

class Validator {
  static store(req, res, next) {
    let { password, email, name, gender, roles } = req.body;
    let errors = {};
    if (!validate.isEmail(email)) errors.email = 'This field must be an email';
    if (!_.isEmpty(errors)) return res.status(500).json({ fail: errors });
    else next();
  }
}

module.exports = Validator;
