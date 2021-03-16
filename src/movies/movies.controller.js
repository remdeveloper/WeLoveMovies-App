const MoviesService = require('./movies.service');

const listMovies = (req, res, next) => {
    const knex = req.app.get('db');
    const { is_showing = "false" } = req.query;

    if (is_showing === "true") {
        MoviesService.getAllMoviesShowing(knex).then(movies => {
            res.json({ data: movies })
        });
    } else {
        MoviesService.getAllMovies(knex).then(movies => {
            res.json({ data: movies })
        });
    }
}

const readMovies = (req, res, next) => {
    const knex = req.app.get('db');
    const { movieId } = req.params;
    
    MoviesService.getMovieById(knex, movieId).then(movie => {
        if (!movie) {
            res.status(404).json({ "error": "Movie cannot be found." })
        }
        res.json({ data: movie });
    })
    .catch(next);
}

module.exports = {
    list: listMovies,
    read: readMovies,
};