const express = require('express')
const mongoose = require('mongoose')
const Record = require('./models/record')//load Record model
const methodOverride = require('method-override')
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


//------------ Setting ------------//
//Setting method-override 路由覆蓋機制
app.use(methodOverride('_method'))
//------------ Setting ------------//


//------------ Setting Routes ------------//
//Route: index page
app.get('/', (req, res) => {
  Record.find()
  .lean()
  .then(records => {
    //轉換Date輸出格式
    records.forEach(record => record.date = new Date(record.date).toLocaleDateString())
    res.render('index', { records })
  })
  .catch(error => console.log(error))
})

//Route: edit page
app.get('/expenseTracker/:id/edit', (req, res) => {
  Record.findOne({id: req.params.id})
    .lean()
    .then(record => res.render('edit', {record}))
    .catch(error => console.log(error))
})

//Route: create page
app.get('/expenseTracker/create', (req, res) => {
  res.render('create')
})

//Route: delete record data
app.delete('/expenseTracker/:id', (req, res) => {
  return Record.deleteOne({id: req.params.id})
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})
//------------ Setting Routes ------------//


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})