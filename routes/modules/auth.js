const express = require('express')
const router = express.Router()

const passport = require('passport')

router.get('/facebook', passport.authenticate('facebook', { 
  scope: ['email', 'public_profile'] //請求用戶資料
}))

router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login',
  successRedirect: '/'
}))

module.exports = router
