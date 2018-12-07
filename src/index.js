const express = require ('express')
//const engine = require('ejs-mate')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const path = require('path')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')

// INITIALITIATIONS
const app = express()
require('./database')
require('./passport/local-auth')

// SETTINGS
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
//app.engine('ejs', engine)
//app.set('view engine', 'ejs')
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: {
    ifCond: function(item1, item2, options) {
      if(item1 === item2) {
       return options.fn(this);
      }
    }}
}))
app.set('view engine', '.hbs')


// MIDDLEWARES
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(session({
 secret: 'mysecretsession',
 resave: true,
 saveUninitialized: true
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// GLOBAL VARIABLES
app.use((req, res, next) => {
  app.locals.signupMessage = req.flash('signupMessage')
  app.locals.signinMessage = req.flash('signinMessage')
  app.locals.user = req.user
  //console.log(app.locals)
  next()
})

// ROUTES
app.use(require('./routes/index'))
app.use(require('./routes/users'))
app.use(require('./routes/reports'))

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => {
 console.log('Server on port ', app.get('port'))
})