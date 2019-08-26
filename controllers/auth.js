const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
function newRoute(req, res) {
  res.render('registrations/new');
}// don't get this

function createRoute(req, res, next) {
  User.create(req.body)
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.redirect('/register');
      }

      const token = jwt.sign({ sub: user._id },
        secret, { expiresIn: '24'});      
      res.json({ user, token, message: 'Thank you for registering' });
    })
    .catch(next);
}



module.exports = {
  new: newRoute,
  create: createRoute,
};
