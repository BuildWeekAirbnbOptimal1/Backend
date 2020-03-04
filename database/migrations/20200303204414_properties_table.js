
exports.up = function(knex) {
    return knex.schema.createTable('host_airbnb', tbl => {
      tbl.increments();
      tbl.integer('host_id').unsigned().notNullable();
    //   foriegn key indicator / connector 
    //   tbl.foreign('host_id').references('users.id').onUpdate('CASCADE').onDelete('CASCADE');
      
      tbl.string('name', 255).notNullable();
      tbl.integer('bedrooms').notNullable();
      tbl.integer('bathrooms').notNullable();
      tbl.string('room_type').notNullable();
      tbl.string('bed_type').notNullable();
      tbl.integer('maximum_nights').notNullable();
      tbl.integer('minimum_nights').notNullable();
      tbl.integer('extra_people').notNullable();
      tbl.integer('accommodates').notNullable();
      tbl.string('Neighbourhood_group_cleansed').notNullable();
      tbl.string('property_type', 255).notNullable();
      tbl.string('cancellation_policy', 255).notNullable();
      tbl.integer('guests_included').notNullable();
      tbl.integer('optimal_price').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('host_airbnb');
  };