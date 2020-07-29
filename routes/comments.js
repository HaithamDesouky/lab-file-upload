const express = require('express');
const commentRouter = new express.Router();
const bcryptjs = require('bcryptjs');
const Post = require('../models/Post.model');
const saltRounds = 10;
const User = require('../models/User.model');
const Comment = require('../models/Comment.model');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'node-file-upload-example'
  }
});
const upload = multer({ storage });
const routeGuard = require('../configs/route-guard.config');
const { countDocuments } = require('../models/User.model');

commentRouter.get('/post/:id/comment', routeGuard, (req, res, next) => {
  const postId = req.params.id;

  console.log(req.body);
  res.render('comment', { postId });
});

commentRouter.post('/post/:id/comment', upload.single('attachment'), routeGuard, (req, res, next) => {
  const id = req.params.id;
  const user = req.session.currentUser._id;
  console.log(id);
  console.log(user);

  console.log('hey body', req.body.content);

  Comment.create({
    content: req.body.content,
    creatorId: user,
    postId: id,
    imagePath: req.body.imagePath,
    imageName: req.body.imageName
  })
    .then(() => {
      res.redirect(`/post/${id}`);
    })
    .catch(error => {
      next(error);
    });
});

// commentRouter.get('/comments/:id/create', routeGuard, (req, res, next) => {
//   const id = req.params.id;
//   Post.findById(id)
//     .then(post => {
//       Comment.find().then(comments => {
//         res.render('users/comments', { post, comments });
//       });
//     })
//     .catch(error => next(error));
// });

// commentRouter.post('/comments/:i', upload.single('imagePath'), routeGuard, (req, res, next) => {
//   const user = req.session.currentUser;
//   const id = req.params.id;

//   Comment.create({
//     content: req.body.content,
//     authorId: user._id,
//     imagePath: req.body.imagePath,
//     imageName: req.body.imageName
//   });

//   Post.findById(id)
//     .then(post => {
//       Comment.find().then(comments => {
//         res.render('users/comments', { post, comments });
//       });
//     })
//     .catch(error => next(error));
// });
module.exports = commentRouter;
