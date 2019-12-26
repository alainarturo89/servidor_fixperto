const crypto = require('crypto-js');
const util = require('./util');

class Seguridad {

  static login(req, res) {
    let { password, email } = req.body;
    password = crypto.createHmac('sha256', password).digest('hex');

  }

  static logout(req, res) {

  }

  static getUsers(req, res) {
    const { name, email, gender } = req.query;
    db.User.find({ name, email, gender }, (error, users) => {
      util.error(res, error, () => res.json({ success: users }));
    });
  }

  static getUser(req, res) {
    const { _id } = req.params;
  
  }

  static addUser(req, res) {
    let { password, email, name, gender, roles } = req.body;
    const { auth } = req.session;

  }

  static updateUser(req, res) {
    const { password, email, name, gender, roles } = req.body;
    const { _id } = req.params;
    const { auth } = req.session;

  }

  static removeUser(req, res) {
    const { _id } = req.params;
    const { auth } = req.session;

  }

  static addRol(req, res) {

  }
  static updateRol(req, res) {
    let { name, summary, resources } = req.body;
    const { _id } = req.params;
    const { auth } = req.session;

  }
  static getRoles(req, res) {
    const { name, summary } = req.query;

  }
  static getRol(req, res) {
    const { _id } = req.params;

  }
  static removeRol(req, res) {
    const { _id } = req.params;

  }
}

module.exports = Seguridad;
