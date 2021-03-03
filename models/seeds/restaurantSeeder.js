const mongoose = require('mongoose')
const RestaurantList = require('../restaurantList')
const restJosn = require('./restaurant.json')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log(error)
})

//新增餐廳JOSN檔案
db.once('open', () => {
  console.log('connected!')
  for (let i = 0; i < restJosn.results.length; i++) {
    RestaurantList.create(
      {
        name: restJosn.results[i].name,
        name_en: restJosn.results[i].name_en,
        category: restJosn.results[i].category,
        image: restJosn.results[i].image,
        location: restJosn.results[i].location,
        phone: restJosn.results[i].phone,
        google_map: restJosn.results[i].google_map,
        rating: restJosn.results[i].rating,
        description: restJosn.results[i].description
      }
    )
  }
  console.log('done!')
})