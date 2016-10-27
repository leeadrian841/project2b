var express = require('express')
var router = express.Router()

var Tenant = require('../models/tenant')

router.get('/', function (req, res) {
  Tenant.find({}, function (err, allTenants) {
    res.json(allTenants)
  })
})

router.get('/:id', function (req, res) {
  Tenant.findOne({ '_id': req.params.id }, function (err, tenant) {
    res.json(tenant)
  })
})

// router.post('/signup', function (req, res) {
//   User.create(req.body.user, function (err, savedUser) {
//     res.json(savedUser)
//   })
// })

module.exports = router
