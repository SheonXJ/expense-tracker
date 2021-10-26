// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//引用dateformat(轉換date format)
const dateformat = require('dateformat')
//引用Record model
const Record = require('../../models/record')
//引用Record model
const Category = require('../../models/category')
//引用DatePrototype
const date = require('../../tools/DatePrototype')

//Route: edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .populate('category', 'name_cn')
    .lean()
    .then(record => {
      record.date = dateformat(record.date, 'yyyy-mm-dd')
      res.render('edit', { record })
    })
    .catch(error => console.log(error))
})

//Route: save edit record data
router.put('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, amount, category } = req.body
  return Category.findOne({ name_cn: category })
    .then(category => {
      Record.findOne({ _id, userId })
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
})

//Route: create page
router.get('/create', (req, res) => {
  const nowDate = date.toDateInputValue()
  res.render('create', { nowDate })
})

//Route: catch create record date
router.post('/create', (req, res) => {
  const { name, date, category, amount } = req.body
  const userId = req.user._id
  return Category.findOne({ name_cn: category})
    .then(category => {
      Record.create({
        name,
        date,
        category,
        amount,
        userId,
      })
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Route: search record data
router.get('/search', (req, res) => {
  const userId = req.user._id
  const sort = req.query.sort
  if (sort === 'all') {
    return res.redirect('/')
  }
  //搜尋此使用者所有資料
  Record.find({ userId })
    .populate('category')
    .sort({ date: -1 })
    .lean()
    .then(searchRecords => {
      //從使用者資料篩選符合sort的資料
      const records = searchRecords.filter(record => record.category.name_cn === sort)
      let totalAmount = 0
      records.forEach(record => {
        //轉換Date輸出格式
        record.date = dateformat(record.date, 'yyyy-mm-dd')
        record.icon = record.category.categoryId
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount, sort })
    })
    .catch(error => console.log(error))
})

//Route: delete record data
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.deleteOne({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router