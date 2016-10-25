var express = require('express')
var router = express.Router()

var Tenant = require('../models/tenant')

router.get('/', function (req, res) {
  Tenant.find({}, function (err, allTenants) {
    res.render('tenant', {
      allTenants: allTenants
    })
  })
})
router.get('/new', function (req, res) {
  res.render('newtenant')
})
// router.post('/', function (req, res) {
//   res.send(req.user)
//   Tenant.create(req.body.tenant, function (err, newTenant) {
//     if (err) throw err
//   })
// })

module.exports = router
