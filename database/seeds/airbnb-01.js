
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('host_airbnb').del()
    .then(function () {
      // Inserts seed entries
      return knex('host_airbnb').insert([
       {
       name: 'Colorado Cottage',
       host_id: 1,
       bedrooms: 4,
       bathrooms: 2,
       bed_type: 'queen',
       room_type: 'Entire home',
       maximum_nights: 16,
       minimum_nights: 3,
       extra_people: 2,
       accommodates: 6,
       Neighbourhood_group_cleansed: 'Lira Group',
       property_type: 'House',
       cancellation_policy: 'Mild',
       guests_included: 2,
       optimal_price: 250,
      },
      {
        name: 'Nashville Nest',
        host_id: 2,
        bedrooms: 2,
        bathrooms: 1,
        bed_type: 'king',
        room_type: 'Entire home',
        maximum_nights: 10,
        minimum_nights: 2,
        extra_people: 1,
        accommodates: 4,
        Neighbourhood_group_cleansed: 'Shev Inc',
        property_type: 'Apartment',
        cancellation_policy: 'Moderate',
        guests_included: 1,
        optimal_price: 175,
       },
       {
        name: 'City Den',
        host_id:3,
        bedrooms: 6,
        bathrooms: 3,
        bed_type: 'king',
        room_type: 'Entire home',
        maximum_nights: 15,
        minimum_nights: 5,
        extra_people: 4,
        accommodates: 11,
        Neighbourhood_group_cleansed: 'Deep Dive initiative',
        property_type: 'Town-House',
        cancellation_policy: 'Strict',
        guests_included: 4,
        optimal_price: 350,
       },
       {
        name: 'Beach House',
        host_id: 4,
        bedrooms: 3,
        bathrooms: 3,
        bed_type: 'queen',
        room_type: 'Entire home',
        maximum_nights: 10,
        minimum_nights: 3,
        extra_people: 3,
        accommodates: 6,
        Neighbourhood_group_cleansed: 'Deep Dive initiative',
        property_type: 'Beach House',
        cancellation_policy: 'Mild',
        guests_included: 2,
        optimal_price: 650,
       },
      ]);
    });
};
