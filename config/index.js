require('dotenv').config()

const config = {
  // General
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  // Mongoose
  dbPassword: process.env.DB_PASSWORD,
  dbUsername: process.env.DB_USERNAME,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  // Passport
  callbackUrl: process.env.NODE_ENV === 'dev'
    ? process.env.CALLBACK_URL_DEVELOPMENT + ':' + process.env.PORT
    : process.env.CALLBACK_URL,
  oauthClientId: process.env.OAUTH_CLIENT_ID,
  oauthClientSecret: process.env.OAUTH_CLIENT_SECRET
}

console.clear()
console.log(config.env ? 'Development mode' : 'Production mode')

module.exports = config
