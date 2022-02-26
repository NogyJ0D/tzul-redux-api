const UserModel = require('../models/user')

class Users {
  validate (user) {
    const error = user.validateSync()
    if (error) {
      const errorMessages = Object.keys(error.errors).map(e => error.errors[e].message)
      return { error: true, errorMessages }
    }

    return { error: false }
  }

  async get (id) {
    return await UserModel.findById(id)
  }

  async getByEmail (email) {
    return await UserModel.findOne({ email })
  }

  async getByUsername (username) {
    return await UserModel.findOne({ username })
  }

  async getByFilter (filter) {
    return await UserModel.findOne(filter)
  }

  async getAll () {
    return await UserModel.find().select(['_id', 'userName', 'email', 'role'])
  }

  async create (data) {
    // return await UserModel.create(data)
    const user = new UserModel(data)
    const validation = this.validate(user)

    if (validation.error) return { created: false, errors: validation.errorMessages }
    else return await UserModel.create(data)
  }

  async update (id, data) {
    return await UserModel.findByIdAndUpdate(id, data, { new: true })
  }

  async delete (id) {
    return await UserModel.findByIdAndDelete(id)
  }
}

module.exports = Users
