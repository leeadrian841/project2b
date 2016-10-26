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
// Go to new property
router.get('/new', function (req, res) {
  res.render('newproperty')
})
// router.post('/:id/edit', function (req, res) {
//   Property.findById(req.params.id, function (err, property) {
//     if (err) throw err
//     res.render('editproperty', {
//       property: property
//     })
//   })
// })
router.get('/:id', function (req, res) {
  Property.findOne({name: req.params.id}, function (err, property) {
    Tenant.find({
      property_id: property._id
    })
    .populate('user_id')
    .exec(function (err, allTenants) {
      res.render('tenant', {
        property: property,
        allTenants: allTenants
      })
    })
  })
})
router.get('/:id/edit', function (req, res) {
  Property.findById(req.params.id, function (err, property) {
    res.render('editproperty', {
      property: property
    })
  })
})
router.put('/:id/edit', function (req, res) {
  var editProperty = req.body.property
  Property.findByIdAndUpdate(req.params.id, editProperty, function (err, property) {
    if (err) throw err
    res.redirect('/user/property')
  })
})
router.delete('/:id', function (req, res) {
  Property.findByIdAndRemove(req.params.id, function (err, property) {
    if (err) {
      throw err
    } else {
      res.redirect('/user/property')
    }
  })
})
// Create new property
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
