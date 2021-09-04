//Require packages in the project
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const exhbs = require('express-handlebars')
const routes = require('./routes')

const port = 3000
const app = express()

//------------ database ------------//
mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('Mongodb error')
})

db.once('open', () => {
  console.log('Mongodb is connected!')
})
//------------ database ------------//


//------------ template engine ------------//
app.engine('hbs', exhbs({ 
  defaultLayout: 'main', 
  extname: 'hbs',
  helpers: require('./config/handlebars-helpers')
}))
app.set('view engine', 'hbs')
//------------ template engine ------------//


//------------ Setting ------------//
//Setting method-override 路由覆蓋機制
app.use(methodOverride('_method'))
//Setting body-parser 進行前置處理
app.use(express.urlencoded({ extended: true }))
// 將 request 導入路由器
app.use(routes)
//------------ Setting ------------//


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})