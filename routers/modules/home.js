const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurantList')

//render index
router.get('/', (req, res) => {
  RestaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//render list model
router.get('/list', (req, res) => {
  return RestaurantList.find()
    .lean()
    .then(restaurants => res.render('list', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router