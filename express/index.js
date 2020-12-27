const express = require('express')
const next = require('next')
var bodyParser = require('body-parser')

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
		var mongoDB = 'mongodb://127.0.0.1/makina_nextdb'
		mongoose.connect(mongoDB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		})

		//Get the default connection
		var db = mongoose.connection
		db.once('open', function () {
			console.log('mongoDb connection status [OK]')
		})

		//Bind connection to error event (to get notification of connection errors)
		db.on('error', console.error.bind(console, 'MongoDB connection error:'))
		/// mongodb end
		const apiRoutes = require('./routes')
		const authRoutes = require('./routes/auth')

		server.use(bodyParser.json())
		server.use('/api', apiRoutes)
		server.use('/api/auth', authRoutes)

		server.get('*', (req, res) => {
			return handle(req, res)
		})

		server.listen(PORT, (err) => {
			if (err) throw err
			console.log(`> Running on MODE: [${process.env.NODE_ENV}] Listening on PORT: [${PORT}]`)
			console.log(`
 ------------------------------------
 envProduction : ${process.env.SECRET}
 ------------------------------------
				`)
		})
	})
	.catch((err) => {
		console.error(err.stack)
		process.exit(1)
	})
