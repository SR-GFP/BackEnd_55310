const Users = require("../Models/users.model")

class mongoUsersDao {
  async getAllUsers() {
    return await Users.find({ staus: true })
  }
  async getUserById(id) {
    return await Users.find({ _id: id })
  }

  async getOneUser(email) {
    return await Users.findOne({ email })
  }

  async addUsers(userInfo) {
    return await Users.create({userInfo})
  }

  async updateUser(id, userInfo) {
    return await Users.updateOne({ _id: id }, userInfo)
  }

  async deleteUser(id) {
    return await Users.updateOne({ _id: id }, { status: false })
  }

  async addManyUser(userInfo) {
    return await Users.insertMany(userInfo)
  }
}

module.exports = mongoUsersDao