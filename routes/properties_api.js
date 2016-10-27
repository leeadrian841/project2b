var express = require('express')
var router = express.Router()

var Property = require('../models/property')

router.get('/', function (req, res) {
  Property.find({}, function (err, allProperties) {
    res.json(allProperties)
  })
})

router.get('/:id', function (req, res) {
  Property.findOne({ '_id': req.params.id }, function (err, property) {
    res.json(property)
  })
})

// router.post('/signup', function (req, res) {
//   User.create(req.body.user, function (err, savedUser) {
//     res.json(savedUser)
//   })
// })

module.exports = router
