const Users = require('./users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { jwtSecret } = require('../config')

class Auth {
  constructor () {
    this.users = new Users()
  }

  getToken (user) {
    const data = {
      username: user.username,
      email: user.email,
      role: user.role,
      id: user._id
    }
    const token = jwt.sign(data, jwtSecret, { expiresIn: '7d' })
    return { data, token }
  }

  async login (email, password) {
    if (!email || !password) {
      return { fail: true, message: 'Enter both credentials.' }
    }

    const user = await this.users.getByEmail(email)
    if (user) {
      const dehashedPassword = await bcrypt.compare(password, user.password)
      if (dehashedPassword) {
        return this.getToken(user)
      }
    }
    return { fail: true, message: 'Credentials do not match.' }
  }

  async signup (userData) {
    if (await this.users.getByFilter({ email: userData.email })) {
      return { fail: true, message: 'This email already exists.' }
    } else if (await this.users.getByFilter({ username: userData.username })) {
      return { fail: true, message: 'This username already exists.' }
    }

    userData.role = 1
    const salt = await bcrypt.genSalt(10)
    userData.password = await bcrypt.hash(userData.password, salt)

    const user = await this.users.create(userData)
    return this.getToken(user)
  }

  async tokenLogin (cookies) {
    if (!cookies.token) return { fail: true, status: 'No-Auth', message: 'A token is required for this process' }

    try {
      const decoded = jwt.verify(cookies.token, jwtSecret)
      return this.getToken(decoded)
    } catch (err) {
      return { fail: true, status: 'Expired', message: 'A valid token is required for this process.' }
    }
  }

  async loginProvider (profile) {
    let user = await this.users.getByFilter({ idProvider: profile.id })

    if (!user) {
      user = await this.users.create({
        username: profile.displayName,
        email: profile.emails ? profile.emails[0].value : undefined,
        role: 1,
        provider: profile.provider,
        idProvider: profile.id
      })
    }
    return this.getToken(user)
  }
}

module.exports = Auth
