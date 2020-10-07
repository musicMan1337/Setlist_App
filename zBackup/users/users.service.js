const UsersService = {
  getByName(db, user_name) {
    return db('users').where({ user_name }).first();
  },

  createUser(db, newUser) {
    return db('users').insert(newUser, '*');
  }
};

module.exports = UsersService;
