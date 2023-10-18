class UserDto {
  constructor(userInfo) {
    this.name = userInfo.name
    this.lastname = userInfo.last_name
    this.fullname = `${userInfo.name} ${userInfo.last_name}`
    this.number = userInfo.number
    this.email = userInfo.email
    this.password = userInfo.password
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

module.exports = UserDto