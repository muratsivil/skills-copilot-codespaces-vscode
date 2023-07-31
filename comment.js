// Create web server using express
const express = require('express')
const router = express.Router()
const Comment = require('../../models/comment')
const Restaurant = require('../../models/restaurant')

// Create a new comment
router.post('/', (req, res) => {
  const userId = req.user._id
  const restaurantId = req.body.restaurantId
  const comment = req.body.text
  return Comment.create({ userId, restaurantId, comment })
    .then(() => {
      return Restaurant.findById(restaurantId)
    })
    .then(restaurant => {
      restaurant.commentsCount = restaurant.commentsCount + 1
      return restaurant.save()
    })
    .then(() => {
      res.redirect(`/restaurants/${restaurantId}`)
    })
    .catch(error => {
      console.log(error)
    })
})

// Delete a comment
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Comment.findById(_id)
    .then(comment => {
      const restaurantId = comment.restaurantId
      return Comment.deleteOne({ _id, userId })
        .then(() => {
          return Restaurant.findById(restaurantId)
        })
        .then(restaurant => {
          restaurant.commentsCount = restaurant.commentsCount - 1
          return restaurant.save()
        })
        .then(() => {
          res.redirect(`/restaurants/${restaurantId}`)
        })
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router