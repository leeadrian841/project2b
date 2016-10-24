var express = require('express')
var router = express.Router()
var passport = require('passport')
// var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')
// var Property = require('../models/property')

function authCheck (req, res, next) {
  if (req.isAuthenticated()) {
    req.flash('profileMessage', 'You have already logged in.')
    return res.redirect('/user')
  } else {
    return next()
  }
}
router.route('/signup')
      .get(authCheck, function (req, res) {
        User.find({}, function (err, allUsers) {
          res.render('signup', {
            allUsers: allUsers,
            message: req.flash('signupMessage')
          })
        })
      })
      .post(passport.authenticate('local-signup', {
        successRedirect: '/user',
        failureRedirect: '/signup',
        failureFlash: true
      }))

router.route('/')
      .get(authCheck, function (req, res) {
        res.render('login', {message: req.flash('loginMessage')})
      })
      .post(passport.authenticate('local-login', {
        successRedirect: '/user',
        failureRedirect: '/',
        failureFlash: true
      }))
// router.post('/signup', function (req, res) {
//   User.create(req.body.user, function (err, savedUser) {
//     req.flash('signupMessage', 'New user created!')
//     res.redirect('signup')
//   })
// })
// router.post('/login', function (req, res) {
//   var user = req.body.user
//
//   User.findOne({ 'local.email': user.local.email }, function (err, foundUser) {
//     if (err) res.send(err.message)
//
//     if (foundUser) {
//       foundUser.authenticate(user.local.password, function (err, authenticated) {
//         if (err) res.send(err)
//
//         if (authenticated) {
//           req.flash('profileMessage', 'You have logged in!')
//           res.redirect('profile')
//         } else {
//           req.flash('loginMessage', 'Wrong password! Please type your password again!')
//           res.redirect('login')
//         }
//       })
//     } else {
//       req.flash('loginMessage', 'Email not found! Please sign up!')
//       res.redirect('login')
//     }
//   })
// })

router.get('/user', function (req, res) {
  res.render('user', {
    message: req.flash('profileMessage'),
    user: req.user
  })
})
router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router
