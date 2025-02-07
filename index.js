const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const { unknownEndpoint } = require('./util/middleware')

const exployeesRouter = require('./controllers/employees')
const desksRouter = require('./controllers/desks')
const roomsRouter = require('./controllers/rooms')
const loginRouter = require('./controllers/login')
const bookingsRouter = require('./controllers/bookings')

app.use(express.json())

app.use('/api/employees', exployeesRouter)
app.use('/api/desks', desksRouter)
app.use('/api/rooms', roomsRouter)
app.use('/api/login', loginRouter)
app.use('/api/bookings', bookingsRouter)


app.use(unknownEndpoint)


const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

// Ensures database connection is established before starting the server
start()


