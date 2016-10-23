var mongoose = require('mongoose')

var propertySchema = new mongoose.Schema({
  name: String,
  address: String,
  postal_code: Number,
  total_units: Number
})

var Property = mongoose.model('Property', propertySchema)

module.exports = Property
