var mongoose = require('mongoose')

var Schema = mongoose.Schema

var tenantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  shop_name: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  date_rented: {
    type: Date,
    default: Date.now
  },
  rent_status: {
    enum: ['Paid', 'Owning']
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }
})

var Tenant = mongoose.model('Tenant', tenantSchema)

module.exports = Tenant
