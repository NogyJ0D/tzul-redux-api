const express = require('express')
const cors = require('cors')
const cookies = require('cookie-parser')
const path = require('path')
const { port } = require('./config')

// Mongodb
const { connection } = require('./config/database')
connection()

// Routes
const auth = require('./routes/auth')
const movies = require('./routes/movies')
const users = require('./routes/users')

const app = express()

// Middlewares
app.use(express.json())
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}))
app.use(cookies())
app.use(express.urlencoded({ extended: true }))

// Using routes
auth(app)
movies(app)
users(app)

// Starting
app.listen(port, () => {
  console.log('Server working on: ' + port)
})

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, 'index.html'))
})
