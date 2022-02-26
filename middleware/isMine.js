const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')

const isMyMovie = (req, res, next) => {
  const { editor } = req.params
  const token = req.cookies.token
  const decoded = jwt.verify(token, jwtSecret)

  if (editor === decoded.id) return next()
  else return res.status(401).json({ fail: true, message: 'You are not the editor of this movie.' })
}

module.exports = { isMyMovie }
