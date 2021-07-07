
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sales').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('sales').insert([
        {
          vin: "1C4RJFAG0EC498242",
          seller_id: "JS001",
          seller: "John Smith"
        }
      ]);
    });
};
