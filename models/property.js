var mongoose = require('mongoose')
var Schema = mongoose.Schema

var propertySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  postalcode: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

var Property = mongoose.model('Property', propertySchema)

module.exports = Property
