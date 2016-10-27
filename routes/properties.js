var express = require('express')
var router = express.Router()

var User = require('../models/user')
var Property = require('../models/property')
var Tenant = require('../models/tenant')

// Go to properties page
router.get('/', function (req, res) {
  Property.find({user: req.user._id}, function (err, allProperties) {
    res.render('property', {
      allProperties: allProperties
    })
  })
})
// Create new property
router.get('/new', function (req, res) {
  res.render('newproperty')
})
// Save new property
router.post('/new', function (req, res) {
  User.find(req.user._id, function (err, user) {
    var newProperty = new Property({
      name: req.body.property.name,
      address: req.body.property.address,
      postalcode: req.body.property.postalcode,
      user: req.user._id
    })
    newProperty.save(function (err, savedProperty) {
      if (err) {
        res.redirect('/user/property/new')
      } else {
        res.redirect('/user/property')
      }
    })
  })
})
// Edit property
router.get('/:id/edit', function (req, res) {
  Property.findById(req.params.id, function (err, property) {
    res.render('editproperty', {
      property: property
    })
  })
})
// Update property
router.put('/:id/edit', function (req, res) {
  var editProperty = req.body.property
  Property.findByIdAndUpdate(req.params.id, editProperty, function (err, property) {
    if (err) {
      res.redirect('/user/property/' + req.params.id + '/edit')
    } else {
      res.redirect('/user/property')
    }
  })
})
// Remove property
router.delete('/:id', function (req, res) {
  Property.findByIdAndRemove(req.params.id, function (err, property) {
    if (err) {
      throw err
    } else {
      res.redirect('/user/property')
    }
  })
})

// Go to tenants page
router.get('/:id/tenant', function (req, res) {
  Property.findOne({_id: req.params.id}, function (err, property) {
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
// Create new tenant
router.get('/:id/tenant/new', function (req, res) {
  Property.findById(req.params.id, function (err, property) {
    res.render('newtenant', {
      property: property
    })
  })
})
// Save new tenant
router.post('/:id/tenant/new', function (req, res) {
  Property.findById(req.params.id, function (err, property) {
    var newTenant = new Tenant({
      name: req.body.tenant.name,
      shop_name: req.body.tenant.shop_name,
      unit: req.body.tenant.unit,
      contact: req.body.tenant.contact,
      date_rented: req.body.tenant.date_rented,
      property_id: req.params.id,
      user_id: req.user._id
    })
    newTenant.save(function (err, savedTenant) {
      if (err) {
        res.redirect('/user/property/' + req.params.id + '/tenant/new')
      } else {
        res.redirect('/user/property/' + req.params.id + '/tenant')
      }
    })
  })
})
// Edit tenant
router.get('/:prop_id/tenant/:id/edit', function (req, res) {
  Property.findById(req.params.prop_id, function (err, property) {
    Tenant.findById(req.params.id, function (err, tenant) {
      res.render('edittenant', {
        property: property,
        tenant: tenant
      })
    })
  })
})
// Update tenant
router.put('/:prop_id/tenant/:id/edit', function (req, res) {
  var editTenant = req.body.tenant
  Tenant.findByIdAndUpdate(req.params.id, editTenant, function (err, tenant) {
    if (err) {
      res.redirect('/user/property/' + req.params.prop_id + '/tenant/' + req.params.id + '/new')
    } else {
      res.redirect('/user/property/' + req.params.prop_id + '/tenant')
    }
  })
})
// Delete tenant
router.delete('/:prop_id/tenant/:id', function (req, res) {
  Tenant.findByIdAndRemove(req.params.id, function (err, tenant) {
    if (err) {
      throw err
    } else {
      res.redirect('/user/property/' + req.params.prop_id + '/tenant')
    }
  })
})

module.exports = router
