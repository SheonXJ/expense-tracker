// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入模組程式碼
// 將網址結構符合字串的 request 導向模組 
const home = require('./modules/home')
const users = require('./modules/users')
const expenseTracker = require('./modules/expenseTracker')

router.use('/users', users)
router.use('/expenseTracker', expenseTracker)
router.use('/', home)

// 匯出路由器
module.exports = router