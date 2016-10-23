var mongoose = require('mongoose')
var Schema = mongoose.Schema

var propertySchema = new Schema({
  name: String,
  address: String,
  postal_code: Number,
  tenant: {
    type: Schema.Types.ObjectId, ref: 'Tenant'
  }
})

var tenantSchema = new Schema({
  name: String,
  shop_name: String,
  unit: String,
  contact: Number,
  date_rented: {
    type: Date,
    default: Date.now
  },
  rent_status: {
    enum: ['Paid', 'Owning']
  }
})

var Tenant = mongoose.model('Tenant', tenantSchema)
var Property = mongoose.model('Property', propertySchema)

module.exports = Tenant
module.exports = Property
