var express = require('express')
var router = express.Router()

var Tenant = require('../models/tenant')
var User = require('../models/user')

router.get('/', function (req, res) {
  res.render('tenant')
})
router.post('/', function (req, res) {
  res.send(req.user)
  Property.create(req.body.property, function (err, newProperty) {
    if (err) throw err
  })
})

module.exports = router
