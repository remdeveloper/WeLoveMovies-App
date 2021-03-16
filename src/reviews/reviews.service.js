const getReviewById = (knex, review_id) => {
    return (
        knex("reviews as r")
            .join("critics as c", "r.critic_id", "=", "c.critic_id")
            .select(
                "r.*",
                "c.preferred_name as critic:preferred_name",
                "c.surname as critic:surname",
                "c.organization_name as critic:organization_name",
            )
            .where({ "review_id": review_id }).first()
    )
}

const getReviewsByMovieId = (knex, movie_id) => {
    return (
        
        knex("reviews as r")
            .join("critics as c", "r.critic_id", "=", "c.critic_id")
            .select(
                "r.*",
                "c.critic_id as critic:critic_id",
                "c.preferred_name as critic:preferred_name",
                "c.surname as critic:surname",
                "c.organization_name as critic:organization_name",
                "c.created_at as critic:created_at",
                "c.updated_at as critic:updated_at"
            )
            .where({ movie_id: movie_id })
    );
}

const updateReviewById = (knex, review_id, updatedReview) => {
    return (
        knex("reviews")
            .select("*")
            .where({ "review_id": review_id })
            .update(updatedReview, "*")
    );
}

const deleteReviewById = (knex, review_id) => knex("reviews").where({ "review_id": review_id }).del();

module.exports = {
    getReviewById,
    getReviewsByMovieId,
    updateReviewById,
    deleteReviewById
}