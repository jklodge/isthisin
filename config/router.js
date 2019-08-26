const router = require('express').Router();
const questions = require('../controllers/questions');
const registrations = require('../controllers/auth');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');

// set up our request handlers
router.get('/', (req, res) => res.render('pages/home'));
router.route('/questions/new')
  .get(secureRoute, questions.new);

router.route('/questions')
  .get(questions.index)
  .post(secureRoute, questions.create);

router.route('/questions/:id')
  .get(questions.show)
  .put(secureRoute, questions.update)
  .delete(secureRoute, questions.delete);

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.user)
  .put(secureRoute, users.update);

router.route('/users/:id/edit')
  .get(secureRoute, users.edit);

router.route('/questions/:id/upvote')
  .post(secureRoute, questions.upvote);

router.route('/questions/:id/downvote')
  .post(secureRoute, questions.downvote);

router.route('/questions/:id/favorite')
  .post(secureRoute, questions.fave)
  .get(secureRoute, questions.deleteFave);

router.route('/questions/:id/edit')
  .get(secureRoute, questions.edit);

router.route('/questions/:id/comments')
  .post(secureRoute, questions.commentsCreate);

router.route('/questions/:id/comments/:commentId')
  .delete(secureRoute, questions.commentsDelete);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/users/:id/follow')
  .post(secureRoute, users.followCreate);

router.route('/users/:id/follow/:followId')
  .delete(secureRoute, users.followDelete);

router.all('/*', (req, res) => res.render('pages/404'));

module.exports = router;
