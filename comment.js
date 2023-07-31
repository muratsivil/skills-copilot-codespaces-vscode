// Create web server
const express = require('express');
const router = express.Router();

// Get comment model
const Comment = require('../models/comment');

// Get comments page
router.get('/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) console.log(err);
    res.json({ comments: comments });
  });
});

// Post comment
router.post('/comment', (req, res) => {
  const comment = new Comment({
    username: req.body.username,
    comment: req.body.comment
  });

  comment.save((err) => {
    if (err) console.log(err);
    res.json({ message: 'Comment has been added!' });
  });
});

// Get single comment
router.get('/comment/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) console.log(err);
    res.json({ comment: comment });
  });
});

// Update a comment
router.put('/comment/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, {
    $set: {
      comment: req.body.comment
    }
  },
    {
      new: true
    },
    (err, comment) => {
      if (err) console.log(err);
      res.json({ comment: comment });
    }
  );
});

// Delete comment
router.delete('/comment/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err, comment) => {
    if (err) console.log(err);
    res.json({ message: 'Comment has been deleted!' });
  });
});

// Exports
module.exports = router;