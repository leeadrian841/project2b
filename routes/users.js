var express = require('express')
var router = express.Router()
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')


router.get('/', function (req, res) {
  res.render('index')
})
router.get('/signup', function (req, res) {
  User.find({}, function (err, allUsers) {
    res.render('signup', {
      allUsers: allUsers,
      message: req.flash('signupMessage')
    })
  })
})
router.get('/login', function (req, res) {
  res.render('login', {message: req.flash('loginMessage')})
})

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/signup',
  failureRedirect: '/signup',
  failureFlash: true
}))
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
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

router.get('/profile', function (req, res) {
  res.render('profile', {
    message: req.flash('profileMessage'),
    user: req.user
  })
})

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('signup')
})

module.exports = router
