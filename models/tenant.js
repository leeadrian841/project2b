var mongoose = require('mongoose')

var Schema = mongoose.Schema

var tenantSchema = new mongoose.Schema({
  name: String,
  shop_name: String,
  unit: String,
  contact: Number,
  rent_status: String
})

var Tenant = mongoose.model('Tenant', tenantSchema)

module.exports = Tenant
