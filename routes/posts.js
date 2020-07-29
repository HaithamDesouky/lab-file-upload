const express = require('express');
const postRouter = new express.Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const Post = require('../models/Post.model');
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

postRouter.get('/create', routeGuard, (req, res, next) => {
  res.render('users/create-post');
});

postRouter.get('/post/:id', routeGuard, (req, res, next) => {
  const id = req.params.id;
  Post.findById(id)
    .populate('creatorId')
    .populate({
      path: 'comments',
      populate: { path: 'creatorId' }
    })
    .then(post => {
      console.log('HERE IS TE POST', post);
      res.render('single', { post });
    })
    .catch(error => next(error));
});

postRouter.get('/feed', routeGuard, (req, res, next) => {
  Post.find()
    .populate('creatorId')
    .then(post => {
      res.render('feed', { post });
    })
    .catch(error => next(error));
});

postRouter.post('/create', upload.single('attachment'), routeGuard, (req, res, next) => {
  const { content } = req.body;
  const url = req.file;
  // console.log(req.session.currentUser);
  Post.create({
    content: content,
    creatorId: req.session.currentUser._id,
    picPath: req.file.path,
    picName: req.file.originalname
  })
    .then(post => {
      res.redirect('/feed');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = postRouter;
