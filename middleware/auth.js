const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')
const { callbackUrl, oauthClientId, oauthClientSecret } = require('../config')

const GoogleStrategy = require('passport-google-oauth20').Strategy

// Passport strategies

const useGoogleStrategy = () => {
  return new GoogleStrategy({
    clientID: oauthClientId,
    clientSecret: oauthClientSecret,
    callbackURL: callbackUrl + '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    // console.log({ accessToken, refreshToken, profile })
    done(null, { profile })
  })
}

// Check user role

// Step 1
const isRegular = (req, res, next) => {
  req.neededRole = 1
  verifyToken(req, res, next)
}
const isEditor = (req, res, next) => {
  req.neededRole = 2
  verifyToken(req, res, next)
}
const isAdmin = (req, res, next) => {
  req.neededRole = 3
  verifyToken(req, res, next)
}
const isOwner = (req, res, next) => {
  req.neededRole = 4
  verifyToken(req, res, next)
}

// Step 2
const verifyToken = (req, res, next) => {
  const auth = req.header('Authorization')
  const tokenCookie = req.cookies.token

  if (!auth && !tokenCookie) {
    return res.status(403).json({
      fail: true,
      status: 'No-Auth',
      message: 'A token is required for this process.'
    })
  }

  if (tokenCookie) {
    handleToken(tokenCookie, req, res, next)
  } else {
    const token = auth.split(' ')[1]
    handleToken(token, req, res, next)
  }
}

// Step 3
const handleToken = (token, req, res, next) => {
  try {
    const decoded = jwt.verify(token, jwtSecret)
    req.user = decoded
    return validateRole(req, res, next)
  } catch (err) {
    return res.status(403).json({
      fail: true,
      status: 'Expired',
      message: 'A valid token is required for this process.'
    })
  }
}

// Step 4
const validateRole = (req, res, next) => {
  if (req.user.role >= req.neededRole) return next()
  else {
    return res.status(403).json({
      fail: true,
      status: 'Insufficient permissions',
      message: 'A superior role is required for this process.'
    })
  }
}

module.exports = { isRegular, isEditor, isAdmin, isOwner, useGoogleStrategy }
