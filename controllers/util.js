const jwt = require('jsonwebtoken');
const moment = require('moment');

class Util {
  static token(user, next) {
    const { tokenKey } = global.config.server;
    let payload = {
      created: moment().unix(),
      expire: moment()
        .add(300, 'm')
        .unix(),
      user: user
    };
    next({ token: jwt.encode(payload, tokenKey) });
  }

  static restrict(req, res, next) {
    let { authorization } = req.headers;
    if (!authorization) return res.status(403).json({ fail: 's02' });
    db.Session.findOne({ token: authorization }, (error, session) => {
      if (error || !session) return res.status(403).json({ fail: 's02' });
      db.User.findById(session.userid, (error, user) => {
        if (error || !user) return res.status(403).json({ fail: 's02' });
        req.session.auth = user;
        next();
      });
    });
  }

  static error(res, errors, next) {
    if (errors) res.status(500).json({ fail: 'e00', error: errors });
    else next();
  }
}
module.exports = Util;
