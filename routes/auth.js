const express = require('express')
const passport = require('passport')
const { useGoogleStrategy, isRegular } = require('../middleware/auth')

const Auth = require('../services/auth')
function auth (app) {
  const router = express.Router()
  const authService = new Auth()
  app.use('/auth', router)

  app.use(passport.initialize())
  passport.use(useGoogleStrategy())
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const response = await authService.login(email, password)

    if (response.fail) return res.json(response)
    return res.cookie('token', response.token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    }).json(response.data)
  })

  router.post('/validate', isRegular, (req, res) => {
    return res.json({ logged: true, user: req.user })
  })

  router.post('/signup', async (req, res) => {
    const user = req.body
    const response = await authService.signup(user)

    if (response.fail) return res.json(response)
    return res.cookie('token', response.token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    }).json(response.data)
  })

  router.post('/logout', (req, res) => {
    return res.cookie('token', '', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: new Date()
    }).json({ loggedOut: true })
  })

  router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
  router.get('/google/callback', passport.authenticate('google'), async (req, res) => {
    const response = await authService.loginProvider(req.user.profile)
    return res.cookie('token', response.token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    }).json(response)
  })
}

module.exports = auth
