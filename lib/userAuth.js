const User = require('../models/user');
// const Usercomment = require('../models/question');



function userAuth(req, res, next) {
  // if there is no user ID, then there is nothing to do, move on to the routes
  if(!req.session.userId) return next();

  // otherwise use the ID to find the user in the database
  User
    .findById(req.session.userId)
    .populate('faves')
    .then(user => {

      // if the user hasn't been found (perhaps if they have deleted their account)
      // log them out (ie delete the data in the session)
      if(!user) req.session.regenerate(() => res.redirect('/login'));

      // add some helpers to res.locals to be used in the views
      res.locals.isAuthenticated = true;
      res.locals.currentUser = user;

      // store the user data on `req` to be used inside the controllers
      req.currentUser = user;

      next();
    });
}

module.exports = userAuth;
//req tells about the request res tells about the response from the client
//when we do res.render we pass data into the template
