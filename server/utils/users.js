
// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    const userToRemove = this.getUser(id);

    if (userToRemove) {
      this.users = this.users.filter(user => user.id !== id);
    }

    return userToRemove;
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  getUserList(room) {
    const roomUsers = this.users.filter((user => user.room === room));

    return roomUsers.map(user => user.name);
  }
}

module.exports = { Users };
