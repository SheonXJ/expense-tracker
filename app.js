const express = require('express')
const mongoose = require('mongoose')
const Record = require('./models/record')//load Record model
const methodOverride = require('method-override')
const exhbs = require('express-handlebars')
const dateformat = require('dateformat')

const date = new Date()
//導入function 現在日期
Date.prototype.toDateInputValue = (function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
})

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
//------------ Setting ------------//


//------------ Setting Routes ------------//
//Route: index page
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        //轉換Date輸出格式
        record.date = dateformat(record.date, 'yyyy-mm-dd')
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

//Route: edit page
app.get('/expenseTracker/:id/edit', (req, res) => {
  Record.findOne({id: req.params.id})
    .lean()
    .then(record => {
      record.date = dateformat(record.date, 'yyyy-mm-dd')
      res.render('edit', { record })
    })
    .catch(error => console.log(error))
})

//Route: save edit record data
app.put('/expenseTracker/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, date, amount, category} = req.body
  return Record.findOne({id})
    .then(record => {
      record.name = name
      record.date = date
      record.amount = amount
      record.category = category
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Route: create page
app.get('/expenseTracker/create', (req, res) => {
  const nowDate = date.toDateInputValue()
  res.render('create', { nowDate })
})

//Route: catch create record date
app.post('/expenseTracker/create', (req, res) => {
  const { name, date, category, amount } = req.body
  Record.find()
    .sort({ "id": -1 })
    .limit(1)
    .lean()
    .then(record => {
      const id = ++record[0].id
      Record.create({
        id,
        name,
        date,
        category,
        amount,
      })
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Route: search record data
app.get('/expenseTracker/search', (req, res) => {
  const sort = req.query.sort
  if (sort === 'all') {
    return res.redirect('/')
  }
  Record.find({category: sort})
    .lean()
    .then(records => {
      records.forEach(record => {
        record.date = dateformat(record.date, 'yyyy-mm-dd')
      })
      res.render('index', { records, sort })
    })
    .catch(error => console.log(error))
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