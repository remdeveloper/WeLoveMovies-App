if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const knex = require("./db/connection");

const moviesRouter = require('./movies/movies.route');
const reviewsRouter = require('./reviews/reviews.route');
const theatersRouter = require('./theaters/theater.route');

app.use(cors());
app.use(express.json());


app.set("db", knex);

app.use("/movies", moviesRouter)
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.all("*", (req, res, next) => {
    const error = { status: 404, message: "Not Found" };
    next(error);
});

app.use((err, req, res, next) => {
    
    console.log(err);
    res.status(err.status).json({ error: err.message });
});

module.exports = app;
