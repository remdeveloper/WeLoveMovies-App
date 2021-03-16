const getAllMovies = (knex) => knex("movies").select("*");

const getMovieById = (knex, id) => knex("movies").select("*").where({ movie_id: id}).first();

const getAllMoviesShowing = (knex) => {
    return (
        knex('movies')
            .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
            .select('movies.movie_id as movie_id',
                'movies.title as title',
                'movies.runtime_in_minutes as runtime_in_minutes',
                'movies.rating as rating',
                'movies.description as description',
                'movies.image_url as image_url')
            .where({ "movies_theaters.is_showing": true })
            .groupBy("movies.movie_id")
    );
};

module.exports = {
    getAllMovies,
    getMovieById,
    getAllMoviesShowing
}