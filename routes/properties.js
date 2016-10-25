var express = require('express')
var router = express.Router()

var User = require('../models/user')
var Property = require('../models/property')
var Tenant = require('../models/tenant')

router.get('/', function (req, res) {
  Property.find({user: req.user._id}, function (err, allProperties) {
    res.render('property', {
      allProperties: allProperties
    })
  })
})
router.get('/:id', function (req, res) {
  Property.findOne({_id: req.params.id}, function (err, property) {
    res.render('tenant', {
      property: property
    })
  })
})
router.get('/:id/new', function (req, res) {
  Property.findOne({_id: req.params.id}, function (err, property) {
    res.render('newtenant', {
      property: property
    })
  })
})
router.post('/:id/new', function (req, res) {
  Property.findOne({_id: req.params.id}, function (err, property) {
    var newTenant = new Tenant({
      name: req.body.tenant.name,
      shop_name: req.body.tenant.shop_name,
      unit: req.body.tenant.unit,
      contact: req.body.tenant.contact,
      date_rented: req.body.tenant.date_rented,
      property: req.params.id
    })
    newTenant.save(function (err, savedTenant) {
      if (err) throw err
      res.redirect('/user/property/' + req.params.id)
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
    newProperty.save(function (err, savedProperty) {
      if (err) throw err
      res.redirect('/user/property')
    })
  })
})

module.exports = router
