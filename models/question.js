const mongoose = require('mongoose');

//what to expect what our database should look like. Schema basically means template
const commentSchema = new mongoose.Schema({
  content: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User'} // ref user is saying I want the user model/object as we about to reference the user.
}, {
  timestamps: true
});

commentSchema
  .virtual('formattedDate')
  .get(function getFormattedDate() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return this.createdAt.getDate() + '-' + monthNames[this.createdAt.getMonth()] + '-' + this.createdAt.getFullYear();
  });

commentSchema.methods.isOwnedBy = function(user) { //have to use .methods
  return this.user && user && user._id.equals(this.user._id);//if user's comment id matches the id that I pass into this function. And we'll use this function for allowing users to delete only their comments.
};

const schema = new mongoose.Schema({
  title: { type: String, minlength: 2, required: true },
  image: { type: String },
  moreinfo: {type: String, maxlength: 360, required: true },
  from: {type: String, maxlength: 360, required: true },
  upvotes: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  downvotes: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  comments: [ commentSchema ]
});

schema.methods.isOwnedBy = function(user) {
  return this.user && user && user._id.equals(this.user._id);
};

schema.methods.hasBeenUpvotedBy = function(user) {
  return user && this.upvotes.some(userId => user._id.equals(userId));//whats this saying?
};

schema.methods.hasBeenDownvotedBy = function(user) {
  return user && this.downvotes.some(userId => user._id.equals(userId));
};


//module is always signualr and they will pluarlise it for us
module.exports = mongoose.model('Question', schema);
