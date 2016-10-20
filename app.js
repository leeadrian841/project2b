var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var flash = require('connect-flash')
var session = require('express-session')
var passport = require('passport')
var dotenv = require('dotenv')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise

dotenv.load({ path: '.env.' + process.env.NODE_ENV })
mongoose.connect(process.env.MONGO_URI)

app.set('view engine', 'ejs')
app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true
}))
app.use(flash())

app.use(passport.initiatize())
app.use(passport.session())

var usersRoutes = require('./routes/users')
var usersAPIRoutes = require('./routes/users_api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/', usersRoutes)
app.use('/api/users', usersAPIRoutes)

app.listen(process.env.PORT || 3000)
console.log('Server initiated at port ' + (process.env.PORT || 3000))
