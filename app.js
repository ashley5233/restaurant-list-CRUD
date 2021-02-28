const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.get('/', (req, res) => {
  const restaurant = restaurantList.results
  return res.render('index', { restaurant })
})

app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`)
})