const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurantList')

router.get('/:type/:method', (req, res) => {
  const type = req.params.type
  const method = req.params.method
  const current = `${type}: '${method}' `
  return RestaurantList.find()
    .sort({ [type]: [method] })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => { console.log(error) })
})

module.exports = router