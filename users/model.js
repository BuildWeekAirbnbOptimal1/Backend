const db = require('../database/dbConfig');

module.exports = {
  addUser,
  findById,
  updateUser,
  deleteUser,
  findBy,
  find
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('users').where(filter);
}

function addUser(user) {
  return db('users')
    .insert(user)
    .returning('id')
    .then(ids => findById(ids[0]));
}

function findById(id) {
  return db('users')
    .select('id', 'username')
    .where({ id })
    .first();
}

// function findUserBy(filter) {
//   return db('users').where(filter);
// }

function updateUser(id, user) {
  return db('users')
    .where({ id })
    .update(user)
    .returning('id')
    .then(ids => {
      let id = ids[0];
      return findBy({ id });
    });
}

function deleteUser(id) {
  return db('users')
    .where({ id })
    .del();
}