var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var flash = require('connect-flash')
var session = require('express-session')
var passport = require('passport')
var methodOverride = require('method-override')
var dotenv = require('dotenv')

var MongoStore = require('connect-mongo')(session)

var mongoose = require('mongoose')
mongoose.Promise = global.Promise

dotenv.load({ path: '.env.' + process.env.NODE_ENV })
mongoose.connect(process.env.MONGO_URI)

app.set('view engine', 'ejs')
app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGO_URI,
    autoReconnect: true
  })
}))

require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

var usersRoutes = require('./routes/users')
var propertiesRoutes = require('./routes/properties')
var tenantsRoutes = require('./routes/tenants')
var usersAPIRoutes = require('./routes/users_api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(methodOverride('_method'))

app.use('/', usersRoutes)
app.use('/user/property', propertiesRoutes)
app.use('/user/tenant', tenantsRoutes)
app.use('/api/users', usersAPIRoutes)

app.listen(process.env.PORT || 3000)
console.log('Server initiated at port ' + (process.env.PORT || 3000))
