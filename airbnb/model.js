const db = require("../database/dbConfig");

module.exports = {
  getProps,
  getUniqueProp,
  addProp,
  updateProp,
  removeProp,
  findById
};

function getProps(hostId) {
  return db("host_airbnb")
    .where("host_id", hostId)
    .select(
      "id",
      "name",
      "bedrooms",
      "bathrooms",
      "bed_type",
      "room_type",
      "maximum_nights",
      "minimum_nights",
      "extra_people",
      "accommodates",
      "Neighbourhood_group_cleansed",
      "property_type",
      "cancellation_policy",
      "guests_included",
      "optimal_price"
    );
}

function getUniqueProp(hostId, propId) {
  return db("host_airbnb")
    .where({ host_id: hostId, id: propId })
    .select(
      "id",
      "name",
      "bedrooms",
      "bathrooms",
      "bed_type",
      "room_type",
      "maximum_nights",
      "minimum_nights",
      "extra_people",
      "accommodates",
      "Neighbourhood_group_cleansed",
      "property_type",
      "cancellation_policy",
      "guests_included",
      "optimal_price"
    )
    .first();
}

function findById(id) {
  return db("host_airbnb")
    .select(
      "id",
      "name",
      "bedrooms",
      "bathrooms",
      "bed_type",
      "room_type",
      "maximum_nights",
      "minimum_nights",
      "extra_people",
      "accommodates",
      "Neighbourhood_group_cleansed",
      "property_type",
      "cancellation_policy",
      "guests_included",
      "optimal_price"
    )
    .where({ id })
    .first();
}

function addProp(prop) {
  return db("host_airbnb").insert(prop, [
    "id",
    "name",
    "bedrooms",
    "bathrooms",
    "bed_type",
    "room_type",
    "maximum_nights",
    "minimum_nights",
    "extra_people",
    "accommodates",
    "Neighbourhood_group_cleansed",
    "property_type",
    "cancellation_policy",
    "guests_included",
    "optimal_price"
  ]);
}

function updateProp(userID, propID, prop) {
  return db("host_airbnb")
    .where({
      host_id: userID,
      id: propID
    })
    .update(prop, [
      "id",
      "name",
      "bedrooms",
      "bathrooms",
      "bed_type",
      "room_type",
      "maximum_nights",
      "minimum_nights",
      "extra_people",
      "accommodates",
      "Neighbourhood_group_cleansed",
      "property_type",
      "cancellation_policy",
      "guests_included",
      "optimal_price"
    ]);
}

function removeProp(userID, propID) {
  return db("host_airbnb")
    .where({
      host_id: userID,
      id: propID
    })
    .del();
}
