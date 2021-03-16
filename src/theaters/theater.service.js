const getAllMovies = (knex) => {
    return (
        knex("theaters as t")
            .innerJoin("movies_theaters as mt", "mt.theater_id", "t.theater_id")
            .innerJoin("movies as m", "m.movie_id", "mt.movie_id")
            .select(
                "t.*",
                "m.movie_id as movies:movie_id",
                "m.title as movies:title",
                "m.runtime_in_minutes as movies:runtime_in_minutes",
                "m.rating as movies:rating",
                "m.description as movies:description",
                "m.image_url as movies:image_url",
                "mt.is_showing as movies:is_showing",
                "t.theater_id as movies:theater_id",
            )
    );
} 

const getTheatersShowingMovie = (knex, movieId) => {
    return (
        knex("movies_theaters as mt")
            .join("theaters as t", "mt.theater_id", "=", "t.theater_id")
            .select("t.*")
            .where({ "mt.movie_id": movieId })
    );
}

module.exports = {
    getAllMovies,
    getTheatersShowingMovie
}