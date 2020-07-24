const express = require("express");

const db = require("../../data/dbConfig.js");
const { orWhereNotExists } = require("../../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res, next) => {
    db("cars")
        .then(cars => {
            res.json(cars);
        })
        .catch(err => {
            next({ code: 500, message: "Error retrieving cars data" });
        });
});

router.get("/:vin", (req, res, next) => {
    const { vin } = req.params;
    
    db("cars")
        .where({ vin: vin })
        .first()
        .then(car => {
            if(car) res.json(car);
            else next({ code: 404, message: "Car not Found" });
        })
        .catch(err => next({ code: 500, message: "Error retrieving car data" }));
});

router.post("/", (req, res, next) => {
    const newCar = req.body;

    if(!(newCar.vin && newCar.make && newCar.model && newCar.mileage)) {
        next({ code: 400, message: "Please provide the Vin number, Make, Model and Mileage for the vehicle" });
    } else {
        db("cars")
            .insert(newCar)
            .then(() => {
                db("cars")
                    .then(cars => res.json(cars))
                    .catch(() => next({ code: 500, message: "Error retrieving cars data." }));
            })
            .catch(err => next({ code: 500, message: "Error adding to the database" }));
    }
});

router.put("/:vin", (req, res, next) => {
    const { vin } = req.params;
    const changes = req.body;
    changes.vin = vin;

    if(!(changes.vin && changes.make && changes.model && changes.mileage)) {
        next({ code: 400, message: "Please provide the Vin number, Make, Model and Mileage for the vehicle" });
    } else {
        db("cars")
            .where({ vin: vin})
            .first()
            .then(car => {
                if(car) {
                    db("cars")
                        .where({ vin: car.vin })
                        .update(changes)
                        .then(() => {
                                db("cars")
                                    .where({ vin: vin })
                                    .first()
                                    .then(car => res.json(car))
                                    .catch(() => next({ code: 500, message: "Error retrieving updated details" }));
                            
                        })
                        .catch(() => next({ code: 500, message: "Error updating car details" }));
                } else {
                    next({ code: 404, message: "Car Not Found" });
                }
            })
            .catch(() => next({ code: 500, message: "Error retrieving car data" }));
            
            
    }
});

router.delete("/:vin", (req, res, next) => {
    const { vin } = req.params;

    db("cars") 
        .where({ vin: vin })
        .first()
        .then(car => {
            if(car) {
                db("cars")
                    .where({ vin: car.vin })
                    .delete()
                    .then(() => res.status(204).send())
                    .catch(() => next({ code: 500, message: "Error removing car details" }));
            } else {
                next({ code: 404, message: "Car Not Found" });
            }
        })
        .catch(() => next({ code: 500, message: "Error retrieving car data" }));
});

module.exports = router;