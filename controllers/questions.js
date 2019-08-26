const Question = require('../models/question');//two dots means outside this folder
const User = require('../models/user');//two dots means outside this folder

const Promise = require('bluebird');
function indexRoute(req, res, next) { //passing the array of questions into the index of question
//use the Question model to get the data from the database
if(req.query.title === 'ALL') req.query = {};
Promise.props({
  allQuestions: Question.find().exec(),
  questions: Question.find(req.query).exec()
})
.then(data => {
  const allTitles = data.allQuestions.map(question => question.title);
  const uniqueTitles = Array.from(new Set(allTitles)).sort();
    res.status(200).json({
      questions: data.questions,
      titles: uniqueTitles,
      selectedTitle: req.query.title
    })
  })
 .catch(next => console.log('error', next));
}

function newRoute(req, res) {
  res.render('questions/new');//why isn't it just get
}

function createRoute(req, res, next) {
  req.body.user = req.currentUser;
  Question.create(req.body)
    .then(()=> res.redirect('/questions'))
    .catch(next);
}

function showRoute(req, res, next) {
  Question.findById(req.params.id)
    // .populate('comments.user user')
    .then(question => {
      if(!question) return res.render('pages/404');
      res.json(question);
    })
    .catch(next);
}

function editRoute(req, res) {
  Question.findById(req.params.id)
    .then(question => res.render('questions/edit', { question }));
}

function updateRoute(req, res, next) {
  return Question.findById(req.params.id)
    .then(question => Object.assign(question, req.body))
    .then(question => question.save())
    .then(question => res.json(question))
    .catch(next);
}

function deleteRoute(req, res) {
  Question.findById(req.params.id)
    .then(question => question.remove())
    .then(() => res.redirect('/questions'));
}

function commentsCreateRoute(req, res, next) {
  req.body.user = req.currentUser;
  Question.findById(req.params.id)
    .then(question => {
      question.comments.push(req.body);
      return question.save();
    })
    .then(question => res.redirect(`/questions/${question._id}`))
    .catch(next);
}
function commentsDeleteRoute(req, res, next) {
  Question.findById(req.params.id)
    .then(question => {
      const comment = question.comments.id(req.params.commentId);//will i ever get params??
      comment.remove();
      return question.save();
    })
    .then(question => res.redirect(`/questions/${question._id}`))
    .catch(next);
}
function upvoteRoute(req, res, next) {
  Question.findById(req.params.id)
    .then(question => {
      question.upvotes.push(req.currentUser);
      question.downvotes = question.downvotes.filter(userId => !userId.equals(req.currentUser._id));

      return question.save();
    })
    .then(() => res.redirect('/questions'))
    .catch(next);
}

function downvoteRoute(req, res, next) {
  Question.findById(req.params.id)
    .then(question => {
      question.downvotes.push(req.currentUser);
      question.upvotes = question.upvotes.filter(userId => !userId.equals(req.currentUser._id));
      return question.save();
    })
    .then(() => res.redirect('/questions'))
    .catch(next);
}

function faveRoute(req, res, next) {
  User.findById(req.currentUser._id)
    .then(user => {
      user.faves.push(req.params.id);
      return user.save();
    })
    .then(() => res.redirect('/questions'))
    .catch(next);
}

function deleteFaveRoute(req, res, next){
  User.findById(req.currentUser._id)
    .then(user => {
      user.faves = user.faves.filter(fave => !fave.equals(req.params.id));
      return user.save();
    })
    .then(() => res.redirect('/questions'))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentsCreate: commentsCreateRoute,
  commentsDelete: commentsDeleteRoute,
  upvote: upvoteRoute,
  downvote: downvoteRoute,
  fave: faveRoute,
  deleteFave: deleteFaveRoute
};
