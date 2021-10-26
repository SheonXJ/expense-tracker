// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//引用Record model
const Record = require('../../models/record')
//引用dateformat(轉換date format)
const dateformat = require('dateformat')

//Route: index page
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .populate('category', 'categoryId')
    .sort({ date: -1 })
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        //轉換Date輸出格式
        record.date = dateformat(record.date, 'yyyy-mm-dd')
        record.icon = record.category.categoryId
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router