// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//引用Record model
const Record = require('../../models/record')
//引用dateformat(轉換date format)
const dateformat = require('dateformat')
//引用ICON
const CATEGORY = require('../../tools/categoryIcon')


//Route: index page
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        //轉換Date輸出格式
        record.date = dateformat(record.date, 'yyyy-mm-dd')
        switch (record.category) {
          case '家居物業':
            record.icon = CATEGORY.home
            break
          case '交通出行':
            record.icon = CATEGORY.transportation
            break
          case '休閒娛樂':
            record.icon = CATEGORY.entertainment
            break
          case '餐飲食品':
            record.icon = CATEGORY.food
            break
          case '其他':
            record.icon = CATEGORY.else
            break
        }
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router