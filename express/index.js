const express = require('express')
var passport = require('passport')
const next = require('next')
var bodyParser = require('body-parser')
const path = require('path')

const PORT = process.env.PORT || 5000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    //Import the mongoose module
    var mongoose = require('mongoose')

    //Set up default mongoose connection
    var mongoDB = process.env.APP_MONGO_DB_URL
    mongoose.connect(mongoDB, {
    })

    //Get the default connection
    var db = mongoose.connection
    db.once('open', function () {
      console.log(`
	--------------------------------
	MongoDb connection status [OK]')
	--------------------------------
			`)
    })

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
    /// mongodb end
    const apiRoutes = require('./routes')
    const authRoutes = require('./routes/auth')
    const userRoutes = require('./routes/user')
    const imagesRoutes = require('./routes/images')
    const usedRoutes = require('./routes/used')
    const categoriesRoutes = require('./routes/categories')
    const brandsRoutes = require('./routes/brands')

    server.use(bodyParser.json())
    server.use('/api', apiRoutes)
    server.use('/api/auth', authRoutes)
    server.use('/api/user', userRoutes)
    server.use('/api/images', imagesRoutes)
    server.use('/api/used', usedRoutes)
    server.use('/api/categories', categoriesRoutes)
    server.use('/api/brands', brandsRoutes)
    server.use(express.static(path.join(__dirname, '../public')))

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(PORT, (err) => {
      if (err) throw err
      console.log(
        `> Running on MODE: [${process.env.NODE_ENV}] Listening on PORT: [${PORT}]`
      )
      console.log(`
 	------------------------------------
 	envProduction values : ${process.env.SECRET && 'OK'}
 	------------------------------------
				`)
    })
  })
  .catch((err) => {
    console.error(err.stack)
    process.exit(1)
  })
