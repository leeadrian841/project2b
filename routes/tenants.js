var express = require('express')
var router = express.Router()

var Tenant = require('../models/tenant')
var Property = require('../models/property')

router.get('/', function (req, res) {
  Property.findById({_id: req.params.id}, function (err, property) {
    Tenant.find({
      property_id: property._id
    })
    .populate('property_id')
    .exec(function (err, allTenants) {
      res.render('tenant', {
        property: property,
        allTenants: allTenants
      })
    })
  })
})
router.get('/:id', function (req, res) {
  Property.findById({_id: req.params.id}, function (err, property) {
    Tenant.find({
      property_id: property._id
    })
    .populate('property_id')
    .exec(function (err, allTenants) {
      res.render('tenant', {
        property: property,
        allTenants: allTenants
      })
    })
  })
})
router.get('/:id/new', function (req, res) {
  // Property.findById({_id: req.params.id}, function (err, property) {
  //   Tenant.find({
  //     property_id: property._id
  //   })
  //   .populate('property_id')
  //   .exec(function (err, allTenants) {
  //     res.render('newtenant', {
  //       property: property,
  //       allTenants: allTenants
  //     })
  //   })
  // })
  Property.findById({_id: req.params.id}, function (err, property) {
    res.render('newtenant', {
      property: property
    })
  })
})
router.post('/:id/new', function (req, res) {
  Property.findById({_id: req.params.id}, function (err, property) {
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
      if (err) throw err
      res.redirect('/user/tenant/' + req.params.id)
    })
  })
})
// router.get('/:id/edit', function (req, res) {
//   Property.findById({_id: req.params.id}, function (err, property) {
//     Tenant.findById(req.params.id)
//     .populate('property_id')
//     .exec(function (err, tenant) {
//       res.render('edittenant', {
//         property: property,
//         tenant: tenant
//       })
//     })
//   })
//   Property.findById({_id: req.params.id}, function (err, property) {
//     Tenant.find({
//       property_id: property._id
//     })
//     .populate('property_id')
//     .exec(function (err, allTenants) {
//       res.render('edittenant', {
//         property: property,
//         tenant: tenant
//       })
//     })
//   })
// })
// router.post('/:id/edit', function (req, res) {
//
// })
router.delete('/:id', function (req, res) {
  console.log(req.user.property)
  Tenant.find({}, function (err, property) {
    Tenant.findByIdAndRemove(req.params.id, function (err, tenant) {
      if (err) {
        throw err
      } else {
        res.redirect('/user/tenant/<%=property._id%>', {
          property: property
        })
      }
    })
  })
})

module.exports = router
