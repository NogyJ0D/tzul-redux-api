const express = require('express')
const { isAdmin } = require('../middleware/auth')
const Users = require('../services/users')

function users (app) {
  const router = express.Router()
  const userService = new Users()
  app.use('/users', router)

  router.get('/', isAdmin, async (req, res) => {
    const users = await userService.getAll()
    return res.status(200).json(users)
  })

  router.get('/:id', isAdmin, async (req, res) => {
    const { id } = req.params
    const user = await userService.get(id)
    return res.status(200).json(user)
  })

  router.put('/:id', isAdmin, async (req, res) => {
    const { id } = req.params
    const user = await userService.update(id, req.body)
    return res.status(200).json(user)
  })

  router.delete('/:id', isAdmin, async (req, res) => {
    const { id } = req.params
    const user = await userService.delete(id)
    return res.status(200).json(user)
  })
}

module.exports = users
