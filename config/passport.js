const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')
module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

 //Setting Local Strategy
  passport.use(new LocalStrategy({ 
    usernameField: 'email',
    passReqToCallback: true, //我們是否要將 req 傳入 verify 函式當中
  }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          req.flash('warning_msg', 'That email is not registered!')
          return done(null, false)
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            req.flash('warning_msg', 'Email or Password incorrect.')
            return done(null, false)
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}