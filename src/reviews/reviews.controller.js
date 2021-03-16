const ReviewsService = require('./reviews.service');
const treeize = require('../utils/treeize');

const reviewExists = async (req, res, next) => {
    
    const knex = req.app.get('db');
    const error = { status: 404, message: `Review cannot be found.` };
    const { reviewId } = req.params;
    if (!reviewId) return next(error);
    
    let review = await ReviewsService.getReviewById(knex, reviewId);

    if (!review) return next(error);

    res.locals.review = review;
    next();
}

const readReviewsByMovie = async (req, res, next) => {
    const knex = req.app.get('db');
    const { movieId } = req.params;

    let reviews = await ReviewsService.getReviewsByMovieId(knex, movieId);
    
    reviews = treeize(reviews);
    
    res.json({ data: reviews });
}

const updateReviews = async (req, res, next) => {
    const knex = req.app.get('db');
    const { 
        review : { review_id: reviewId, ...review },
    } = res.locals;
    const updatedReview = {
        score: req.body.data.score,
        content: req.body.data.content
    };

    await ReviewsService.updateReviewById(knex, reviewId, updatedReview);

    let returnedReviews = { review_id: reviewId, ...review, ...req.body.data };

    returnedReviews = treeize(returnedReviews);

    res.json({ data: returnedReviews });
}

const deleteReviews = async (req, res, next) => {
    const knex = req.app.get('db');
    const { review } = res.locals;

    await ReviewsService.deleteReviewById(knex, review.review_id);

    res.sendStatus(204);
}

module.exports = {
    read: readReviewsByMovie,
    update: [reviewExists, updateReviews],
    delete: [reviewExists, deleteReviews]
}

