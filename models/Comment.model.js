const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  imagePath: {
    type: String
  },
  imageName: {
    type: String
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
