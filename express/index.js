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
					------------------------------
					secret : ${process.env.SECRET}
					------------------------------
				`)
    })
  })
  .catch((err) => {
    console.error(err.stack)
    process.exit(1)
  })
