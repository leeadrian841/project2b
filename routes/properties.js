var express = require('express')
var router = express.Router()

var Property = require('../models/property')
var User = require('../models/user')

router.get('/', function (req, res) {
  res.render('property')
})
router.post('/', function (req, res) {
  res.send(req.user)
  Property.create(req.body.property, function (err, newProperty) {
    if (err) throw err
  })
})

module.exports = router
