module.exports = class TaskDto {
  base;

  initiator;

  figurant;

  constructor(user) {
    this.base = user.base;
    this.initiator = user.initiator;
    this.figurant = user.figurant;
  }
};
