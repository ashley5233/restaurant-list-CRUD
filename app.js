const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000
const routers = require('./routers')
require('./config/mongoose')


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routers)


app.listen(PORT, () => {
  console.log(`express is running on http://localhost:${PORT}`)
})
