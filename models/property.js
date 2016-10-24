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
  tenant: {
    type: Schema.Types.ObjectId, ref: 'Tenant'
  }
})

// var tenantSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   shop_name: {
//     type: String,
//     required: true
//   },
//   unit: {
//     type: String,
//     required: true
//   },
//   contact: {
//     type: Number,
//     required: true
//   },
//   date_rented: {
//     type: Date,
//     default: Date.now
//   },
//   rent_status: {
//     enum: ['Paid', 'Owning']
//   }
// })

// var Tenant = mongoose.model('Tenant', tenantSchema)
var Property = mongoose.model('Property', propertySchema)

// module.exports = Tenant
module.exports = Property
