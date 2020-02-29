exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl.string("firstname", 255).notNullable();
    tbl.string("lastname", 255).notNullable();
    tbl.string("email").notNullable().unique();
    tbl.string("username").notNullable().unique();
    tbl.string("password", 255).notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExist('users')
};
