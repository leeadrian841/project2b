var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'user[local][email]',
    passwordField: 'user[local][password]',
    passReqToCallback: true
  }, function (req, email, password, next) {
    process.nextTick(function () {
      User.findOne({'local.email': email}, function (err, foundUser) {
        if (err) return next(err)
        if (foundUser) {
          return next(null, false, req.flash('signupMessage', 'Email has been taken!'))
        } else {
          User.create(req.body.user, function (err, newUser) {
            if (err) throw err
            return next(null, newUser, req.flash('signupMessage', 'New user created!'))
          })
        }
      })
    })
  }))
  passport.use('local-login', new LocalStrategy({
    usernameField: 'user[local][email]',
    passwordField: 'user[local][password]',
    passReqToCallback: true
  }, function (req, email, password, done) {
      User.findOne({'local.email': email}, function (err, user) {
        if (err) throw done(err)
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'No user found! Please sign up!'))
        }
        // if (!user.validPassword(password)) {
        //   return done(null, false, req.flash('loginMessage', 'Wrong password! Please type your password!'))
        // }
        return done(null, user, req.flash('profileMessage', 'You have logged in successfully!'))
      })
  }))
}
