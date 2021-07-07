
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          "vin": "1C4RJFAG0EC498242",
          "year": 2014,
          "make": "Jeep",
          "model": "Grand Cherokee",
          "mileage": 61968,
          "price": 19995,
          "fuel_type": "Gasoline",
          "interior_color": "Black",
          "transmission_type": null,
          "drivetrain": "4x4",
          "title_status": null
          },
          {
          "vin": "MAJ3S2GE4LC319478",
          "year": 2020,
          "make": "Ford",
          "model": "EcoSport SE",
          "mileage": 8,
          "price": 23114,
          "fuel_type": "Gasoline",
          "interior_color": "Ebony",
          "transmission_type": "6-Speed Automatic",
          "drivetrain": "FWD",
          "title_status": "clean"
          }
      ]);
    });
};
