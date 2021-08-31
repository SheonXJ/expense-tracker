const express = require('express')
const mongoose = require('mongoose')
const Record = require('./models/record')//load Record model
const exhbs = require('express-handlebars')

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
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
//------------ template engine ------------//


//Setting Routes
app.get('/', (req, res) => {
  Record.find()
  .lean()
  .then(records => res.render('index', { records }))
  .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})