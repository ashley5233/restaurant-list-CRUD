const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurantList')

// add new restaurant
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/new', (req, res) => {
  //Destructuring Assignment
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  return RestaurantList.create({
    name: name,
    category: category,
    image: image,
    location: location,
    phone: phone,
    google_map: google_map,
    rating: rating,
    description: description
  })
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

//render detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then(restaurants => res.render('detail', { restaurants }))
    .catch(error => console.log(error))
})

//render edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then(restaurants => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

router.put('/:id/', (req, res) => {
  const id = req.params.id
  //Destructuring Assignment 
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  return RestaurantList.findById(id)
    .then((restaurants) => {
      restaurants.name = name
      restaurants.phone = phone
      restaurants.category = category
      restaurants.rating = rating
      restaurants.location = location
      restaurants.image = image
      restaurants.google_map = google_map
      restaurants.description = description
      return restaurants.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//delete
router.delete('/:id/', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .then(restaurants => {
      return restaurants.remove()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router
