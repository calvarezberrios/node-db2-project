const express = require("express");
const helmet = require("helmet");

const carsRouter = require("./cars/carsRouter.js");

const api = express();
api.use(helmet());
api.use(express.json());

api.use("/api/cars", carsRouter);

api.get("/api", (req, res, next) => {
    res.send("API running successfully!");
});

api.use((req, res) => {
    res.send(`There is no ${req.method} method for ${req.url}`);
});

api.use((err, req, res, next) => {
    res.status(err.code).json(err);
});

module.exports = api;