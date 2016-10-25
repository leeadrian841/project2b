var express = require('express')
var router = express.Router()

var User = require('../models/user')
var Property = require('../models/property')

router.get('/', function (req, res) {
  Property.find({user: req.user._id}, function (err, allProperties) {
    res.render('property', {
      allProperties: allProperties
    })
  })
})
router.get('/:id', function (req, res) {
  Property.find({user: req.user._id}, function (err, allProperties) {
    res.render('property', {
      allProperties: allProperties
    })
  })
})
router.get('/new', function (req, res) {
  res.render('newproperty')
})
router.post('/new', function (req, res) {
  User.find(req.user._id, function (err, user) {
    var newProperty = new Property({
      name: req.body.property.name,
      address: req.body.property.address,
      postalcode: req.body.property.postalcode,
      user: req.user._id
    })
    newProperty.save()
    res.redirect('/user/property')
  })
})

module.exports = router
