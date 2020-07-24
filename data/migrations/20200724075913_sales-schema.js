
exports.up = function(knex, Promise) {
    return knex.schema.createTable("sales", tbl => {
        tbl.increments();
        tbl.varchar("vin", 255).notNullable().unique();
        tbl.foreign("vin").references("cars.vin");
        //tbl.varchar("vin", 255).unsigned().notNullable().references("vin").inTable("cars").index();
        tbl.text("seller").notNullable();
        tbl.varchar("seller_id", 128).notNullable();
        tbl.timestamp("transaction_date").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("sales");
};
