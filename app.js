const express = require('express')
const RestaurantList = require('./models/restaurantList')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000


mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log(error)
})

db.once('open', () => {
  console.log('mongodb is connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// render index
app.get('/', (req, res) => {
  RestaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// search bar
app.get('/search', (req, res) => {
  const regex = new RegExp(escapeRegex(req.query.keyword), 'gi')
  RestaurantList.find({ name: regex })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// add new restaurant
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants/new', (req, res) => {
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
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then(restaurants => res.render('detail', { restaurants }))
    .catch(error => console.log(error))
})

//render edit
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then(restaurants => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id/', (req, res) => {
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
app.delete('/restaurants/:id/', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .then(restaurants => {
      return restaurants.remove()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`)
})

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}