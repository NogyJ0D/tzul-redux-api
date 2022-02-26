const express = require('express')
const Movies = require('../services/movies')

const { isEditor } = require('../middleware/auth')
const { isMyMovie } = require('../middleware/isMine')

function movies (app) {
  const router = express.Router()
  const moviesService = new Movies()
  app.use('/movies', router)

  router.get('/', async (req, res) => {
    const movies = await moviesService.getAll()
    return res.status(200).json(movies)
  })

  router.get('/:id', async (req, res) => {
    const { id } = req.params
    const movie = await moviesService.get(id)
    return res.status(200).json(movie)
  })

  router.get('/last/:date', async (req, res) => {
    const { date } = req.params
    const movies = await moviesService.getLast(date)
    return res.status(200).json(movies)
  })

  router.get('/ranking/:sorter', async (req, res) => {
    const { sorter } = req.params
    const movies = await moviesService.getRanking10(sorter)
    return res.status(200).json(movies)
  })

  router.get('/editor/:id', isEditor, async (req, res) => {
    const { id } = req.params
    const movies = await moviesService.getByEditorId(id)
    return res.status(200).json(movies)
  })

  router.post('/', isEditor, async (req, res) => {
    const movie = await moviesService.create(req.body)
    return res.status(201).json(movie)
  })

  router.put('/:id', isEditor, isMyMovie, async (req, res) => {
    const { id } = req.params
    const movie = await moviesService.update(id, req.body)
    return res.status(200).json(movie)
  })

  router.delete('/:id', isEditor, async (req, res) => {
    const { id } = req.params
    const movie = await moviesService.delete(id)
    return res.status(200).json(movie)
  })
}

module.exports = movies
