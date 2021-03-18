const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurantList')


// search bar
router.get('/', (req, res) => {
  const regex = new RegExp(escapeRegex(req.query.keyword), 'gi')
  RestaurantList.find({ name: regex })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

module.exports = router