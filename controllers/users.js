const User = require('../models/user');
const Question = require('../models/question');
const Promise = require('bluebird');


function usersIndex(req, res, next) {
  User.find()
    .then(users => res.json(users))
    .catch(next);
}

// function usersShow(req, res, next) {
//   // find all the questions that the user has commented on
//   Promise.props({
//     questions: Question.find({ 'comment.user': req.params.id }).exec(),
//     user: User.findById(req.params.id).populate('faves followedUsers followers').exec()
//   })
//     .then(data => {
//       if(!data.user) return res.render('pages/404');
//       res.render('registrations/show', data);//whats this
//     })
//     .catch(next);
// }

function showUserRoute(req, res, next){
  User.findById(req.params.id)
  .then(user => res.json(user))
    .catch(next);
}

function editRoute(req, res) {
  User.findById(req.params.id)
    .then(user => res.render('registrations/edit', { user }));
}

function updateRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => Object.assign(user, req.body)) //assign assigns anythiing on the other side (req.body) onto the question
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function followCreate(req, res, next) {
  req.currentUser.followedUsers.push(req.params.id); //assign assigns anythiing on the other side (req.body) onto the question
  req.currentUser.save()
    .then(() => User.findById(req.params.id))
    .then(user => {
      user.followers.push(req.currentUser); //assign assigns anythiing on the other side (req.body) onto the question
      return user.save();
    })
    .then(() => res.redirect(`/users/${req.params.id}`))
    .catch(next);
}

function followDelete(req, res, next) {
  req.currentUser.followedUsers = req.currentUser.followedUsers.filter(userId => !userId.equals(req.params.id));
  req.currentUser.save()
    .then(() => User.findById(req.params.id))
    .then(user => {
      user.followers = user.followers.filter(userId => !userId.equals(req.currentUser._id));
      return user.save();
    })
    .then(() => res.redirect(`/users/${req.params.id}`))
    .catch(next);
}

module.exports = {
  index: usersIndex,
  // show: usersShow,
  user: showUserRoute,
  edit: editRoute,
  update: updateRoute,
  followCreate: followCreate,
  followDelete: followDelete
};
