const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  aboutyou: {type: String, maxlength: 360 },
  faves: [{ type: mongoose.Schema.ObjectId, ref: 'Question'}],
  followedUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  followers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}]
});

schema.methods.isOwnedBy = function(user) {
  return this.user && user && user._id.equals(this.user._id);
};

schema.methods.hasFollowed = function hasFollowed(user) {
  return this.followedUsers.some((follow) => {
    return follow.equals(user._id);
  });
};

schema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    return this.image || 'http://fillmurray.com/64/64';
  });

// set up the passwordConfirmation virtual
schema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    // store the password on the user model temporarily so we can access it in our pre-validate hook
    // `this` refers to the user object
    this._passwordConfirmation = passwordConfirmation;
  });

// set up a pre-validate hook
schema.pre('validate', function checkPassword(next) {
  // check if the password has been modified and if so whether the password and the passwordConfirmation match
  // if not invalidate the passwordConfirmation, so that the validations fail
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');

  // otherwise continue to the next step (validation)
  next();
});

//methods is similar to prototype it's now available for all
schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};


schema.pre('save', function hashPassword(next) {
  // if the password has been modified, it needs to be hashed
  if(this.isModified('password')) {
    // hash the password with bcrypt and store the hashed password on the user object
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  // continue to the next step (save)
  next();
});

schema.methods.hasFavorited = function hasFavorited(question) {
  return this.faves.some((favorite) => {
    return favorite.equals(question._id);
  });
};

module.exports = mongoose.model('User', schema);
