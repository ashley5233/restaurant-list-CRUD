const mongoose = require('mongoose')
const RestaurantList = require('../restaurantList')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log(error)
})

db.once('open', () => {
  console.log('connected!')
  for (let i = 0; i < 10; i++) {
    RestaurantList.create({ name: 'name-' + i })
  }
  console.log('done!')
})