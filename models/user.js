var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema

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
// var propertySchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   postal_code: {
//     type: Number,
//     required: true
//   },
//   tenant: {
//     type: Schema.Types.ObjectId,
//     ref: 'Tenant'
//   }
// })
var userSchema = new Schema({
  local: {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
})

// var newUser = new User({
//   local: {
//     email: 'test@gmail.com',
//     password: 'test123',
//     properties: []
//   }
// })

userSchema.pre('save', function (next) {
  var user = this
  bcrypt.genSalt(function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.local.password, salt, function (err, hash) {
      if (err) return next(err)

      user.local.password = hash
      next()
    })
  })
})

userSchema.methods.authenticate = function (givenPassword, callback) {
  var hashedPassword = this.local.password

  bcrypt.compare(givenPassword, hashedPassword, function (err, isMatch) {
    callback(err, isMatch)
  })
}

// var Tenant = mongoose.model('Tenant', tenantSchema)
// var Property = mongoose.model('Property', propertySchema)
var User = mongoose.model('User', userSchema)

// module.exports = Tenant
// module.exports = Property
module.exports = User
