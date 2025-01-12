const LocalStrategy = require('passport-local').Strategy
const { User } = require('../../models')
const bcrypt = require('bcryptjs')

module.exports = passport => {
  passport.use(new LocalStrategy({
    usernameField: 'account',
    passwordField: 'password'
  }, (account, password, done) => {
    // use email to check user exist
    // 查出使用者資料，放入req.user
    User.findOne({ where: { account } })
      .then(user => {
        if (!user) {
          const error = new Error('帳號不存在！')
          error.status = 401
          return done(error, false)
        }
        // compare password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            const error = new Error('帳號或是密碼錯誤！')
            error.status = 401
            return done(error, false)
          }
          // authenticated, return user
          return done(null, user)
        })
          .catch(err => done(err, false))
      })
  }))
}
