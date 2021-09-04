// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//引用dateformat(轉換date format)
const dateformat = require('dateformat')
//引用Record model
const Record = require('../../models/record')
//引用DatePrototype
const date = require('../../tools/DatePrototype')
//引用function tools [switchCategoryIcon]
const method = require('../../tools/switchCategoryIcon')

//Route: edit page
router.get('/:id/edit', (req, res) => {
  Record.findOne({ id: req.params.id })
    .lean()
    .then(record => {
      record.date = dateformat(record.date, 'yyyy-mm-dd')
      res.render('edit', { record })
    })
    .catch(error => console.log(error))
})

//Route: save edit record data
router.put('/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, date, amount, category } = req.body
  return Record.findOne({ id })
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
router.get('/create', (req, res) => {
  const nowDate = date.toDateInputValue()
  res.render('create', { nowDate })
})

//Route: catch create record date
router.post('/create', (req, res) => {
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
router.get('/search', (req, res) => {
  const sort = req.query.sort
  if (sort === 'all') {
    return res.redirect('/')
  }
  Record.find({ category: sort })
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        record.date = dateformat(record.date, 'yyyy-mm-dd')
        record.icon = method.switchCategoryIcon(record.category)
        totalAmount += record.amount
      })
      res.render('index', { records, sort, totalAmount })
    })
    .catch(error => console.log(error))
})

//Route: delete record data
router.delete('/:id', (req, res) => {
  return Record.deleteOne({ id: req.params.id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router