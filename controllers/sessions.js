const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
function newRoute(req, res) {
  res.render('sessions/new');
}


function createRoute(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const token = jwt.sign({ sub: user._id },
        secret, { expiresIn: '24h' });
      res.json({ user, token, message: `Welcome ${user.username}` });
    })
    .catch(next);
}

function deleteRoute(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}
module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
