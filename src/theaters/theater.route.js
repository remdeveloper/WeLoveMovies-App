const router = require("express").Router({mergeParams:true})
const TheaterController = require ("./theater.controller")
const methodNotAllowed = require("../methodNotAllowed")

router.route("/")

    .get(TheaterController.list)
    .all(methodNotAllowed);


module.exports = router