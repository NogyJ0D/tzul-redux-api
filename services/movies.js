const MovieModel = require('../models/movie')

class Movies {
  validate (movie) {
    const error = movie.validateSync()
    if (error) {
      const errorMessages = Object.keys(error.errors).map(e => error.errors[e].message)
      return { error: true, errorMessages }
    }

    return { error: false }
  }

  async get (id) {
    // return await MovieModel.findById(id)
    const movie = await MovieModel.findById(id)
    console.log(movie)
    return movie
  }

  async getLast (date) {
    return await MovieModel.find().sort([[date, -1]]).limit(10)
  }

  async getRanking10 (sorter) {
    return await MovieModel.find().sort({ rating: sorter }).limit(10)
  }

  async getByEditorId (id) {
    return await MovieModel.find({ editor: id }).sort({ name: 1 })
  }

  async getAll () {
    return await MovieModel.find().sort({ name: 1 })
  }

  async create (data) {
    const movie = new MovieModel(data)
    const validation = this.validate(movie)

    if (validation.error) return { created: false, errors: validation.errorMessages }
    else return await MovieModel.create(data)
  }

  async update (movie, editor, data) {
    return await MovieModel.findOneAndUpdate({ _id: movie, editor: editor }, data, { new: true })
  }

  async delete (id) {
    return await MovieModel.findByIdAndDelete(id)
  }
}

module.exports = Movies
