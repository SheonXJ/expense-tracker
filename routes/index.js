// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入模組程式碼
// 將網址結構符合字串的 request 導向模組 
const home = require('./modules/home')
router.use('/', home)

const expenseTracker = require('./modules/expenseTracker')
router.use('/expenseTracker', expenseTracker)

// 匯出路由器
module.exports = router