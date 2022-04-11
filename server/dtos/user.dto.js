module.exports = class UserDto {
  login;

  id;

  status;

  role;

  constructor(user) {
    this.id = user.id;
    this.login = user.login;
    this.status = user.status;
    this.role = user.role;
  }
};
