const router = require("express").Router({ mergeParams: true });
const MoviesController = require("./movies.controller");
const TheaterController = require("../theaters/theater.controller");
const ReviewController = require("../reviews/reviews.controller");
const methodNotAllowed = require("../methodNotAllowed");

router.route("/")
    .get(MoviesController.list)
    .all(methodNotAllowed);

router.route("/:movieId")
    .get(MoviesController.read)
    .all(methodNotAllowed);

router.route("/:movieId/theaters")
    .get(TheaterController.read)
    .all(methodNotAllowed);

router.route("/:movieId/reviews")
    .get(ReviewController.read)
    .all(methodNotAllowed);

module.exports = router;