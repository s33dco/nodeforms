
const path          = require('path')           // The path module provides utilities for working with file and directory paths
const express       = require('express')
const layout        = require('express-layout') // ejs
const bodyParser    = require('body-parser')
const validator     = require('express-validator')
const cookieParser  = require('cookie-parser')    // for flash messaging
const session       = require('express-session')  //
const flash         = require('express-flash')    //
const helmet        = require('helmet')           // prevent tampering with headers
const csrf          = require('csurf')            // protect against csrf


const routes = require('./routes')
const app = express()




app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')



const middlewares = [
  helmet(),
  layout(),
  express.static(path.join(__dirname, 'public')),
  bodyParser.urlencoded({ extended: true }),
  validator(),
  cookieParser(),
  session({
    secret: 'super-secret-key',
    key: 'super-secret-cookie',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }),
  flash(),
  csrf({ cookie: true })
]

app.use(middlewares)

app.use('/', routes)

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, () => {
  console.log(`App running at http://localhost:3000`)
})
