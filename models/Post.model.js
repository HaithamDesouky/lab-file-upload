const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    minlength: 3,
    maxlength: 280,
    required: true
  },
  picPath: { type: String },
  picName: { type: String },
  comments: [mongoose.Schema.Types.ObjectId]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
