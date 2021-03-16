const router = require("express").Router({ mergeParams: true });
const ReviewController = require("./reviews.controller");
const methodNotAllowed = require("../methodNotAllowed");

router.route("/:reviewId")

    .put(ReviewController.update)
    .delete(ReviewController.delete)
    .all(methodNotAllowed);
    
    
module.exports = router;