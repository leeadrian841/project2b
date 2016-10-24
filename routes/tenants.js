var express = require('express')
var router = express.Router()

var Tenant = require('../models/tenant')
var User = require('../models/user')

router.get('/', function (req, res) {
  Tenant.find({}, function (err, allTenants) {
    res.render('tenant', {
      allTenants: allTenants
    })
  })
})
router.post('/', function (req, res) {
  res.send(req.user)
  Tenant.create(req.body.tenant, function (err, newTenant) {
    if (err) throw err
  })
})

module.exports = router
