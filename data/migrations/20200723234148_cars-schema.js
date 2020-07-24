exports.up = function(knex, Promise) {
    return knex.schema.createTable("cars", tbl => {
        tbl.varchar("vin", 255).notNullable().primary();
        tbl.integer("year");
        tbl.text("make").notNullable();
        tbl.text("model").notNullable();
        tbl.integer("mileage").notNullable();
        tbl.float("price", 2);
        tbl.text("fuel_type").notNullable().defaultTo("Gasoline");
        tbl.text("interior_color").notNullable().defaultTo("Black");
        tbl.text("transmission_type");
        tbl.text("drivetrain");
        tbl.text("title_status");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("cars");
};
