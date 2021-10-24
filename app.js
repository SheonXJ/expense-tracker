//Require packages in the project
const express = require('express')
const methodOverride = require('method-override')
const exhbs = require('express-handlebars')
const session = require('express-session')
const routes = require('./routes')

const usePassport = require('./config/passport')
require('./config/mongoose')

const PORT = process.env.PORT || 3000
const app = express()

//template engine
app.engine('hbs', exhbs({ 
  defaultLayout: 'main', 
  extname: 'hbs',
  helpers: require('./config/handlebars-helpers')
}))
app.set('view engine', 'hbs')
//Setting Session
app.use(session({
  secret: 'thisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
//Setting passport
usePassport(app)
//Setting static files
app.use(express.static('public'))
//Setting method-override 路由覆蓋機制
app.use(methodOverride('_method'))
//Setting body-parser 進行前置處理
app.use(express.urlencoded({ extended: true }))
// 將 request 導入路由器
app.use(routes)

//Activate and listen on the Express server
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})