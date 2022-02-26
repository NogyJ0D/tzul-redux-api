const mongoose = require('mongoose')
const config = require('.')

const connection = async () => {
  const conn = await mongoose.connect(`mongodb+srv://${config.dbUsername}:${config.dbPassword}@${config.dbHost}/${config.dbName}`)
  console.log('MongoDB connected')
}

module.exports = { connection, mongoose }
