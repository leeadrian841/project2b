var express = require('express')
var router = express.Router()

var User = require('../models/user')
var Property = require('../models/user')

router.get('/', function (req, res) {
  Property.find({}, function (err, allProperties) {
    res.render('property', {
      allProperties: allProperties
    })
  })
})
router.post('/', function (req, res) {
  User.findById(req.user._id, function (req, res) {
    Property.create(req.user.local.properties, function (err, newProperty) {
      if (err) throw err
    })
  })
})

module.exports = router
