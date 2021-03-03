const express = require('express')
const RestaurantList = require('./models/restaurantList')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
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

// render index
app.get('/', (req, res) => {
  RestaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// search bar
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const regex = new RegExp(escapeRegex(req.query.keyword), 'gi')
  RestaurantList.find({ name: regex })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
})

//detial
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then(restaurants => res.render('detail', { restaurants }))
})

app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`)
})

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}