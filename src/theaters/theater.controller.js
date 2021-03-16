const TheatersService = require('./theater.service');
const treeize = require('../utils/treeize');

const getAllTheaters = async (req, res, next) => {
    const knex = req.app.get("db");
    let theaters = await TheatersService.getAllMovies(knex);

    theaters = treeize(theaters);

    res.json({ data: theaters });
}

const readTheatersByMovie = (req, res, next) => {
    const knex = req.app.get("db");
    const { movieId } = req.params;
    

    TheatersService.getTheatersShowingMovie(knex, movieId).then(theaters => {
        res.json({ data: theaters })
    });
}

module.exports = {
    list: getAllTheaters,
    read: readTheatersByMovie
}