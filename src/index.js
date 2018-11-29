const express = require ('express')
//const engine = require('ejs-mate')
const engine = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
//
const app = express()
require('./database')
require('./passport/local-auth')

// Settigns
app.set('views', path.join(__dirname, 'views'))
//app.engine('ejs', engine)
//app.set('view engine', 'ejs')
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(session({
 secret: 'mysecretsession',
 resave: false,
 saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  app.locals.signupMessage = req.flash('signupMessage')
  app.locals.signinMessage = req.flash('signinMessage')
  app.locals.user = req.user
  console.log(app.locals)
  next()
})

//Routes
app.use('/', require('./routes/index'))

app.listen(app.get('port'), () => {
 console.log('Server on port ', app.get('port'))
})