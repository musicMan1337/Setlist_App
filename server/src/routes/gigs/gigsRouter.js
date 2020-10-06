const express = require('express');
const GigsService = require('./gigsService');

const gigsRouter = express.Router();
const jsonBodyParser = express.json();

gigsRouter.route('/').get((req, res, next) => {
  GigsService.getAllGigs(req.app.get('db'))
    .then((things) => {
      res.json(GigsService.serializeThings(things));
    })
    .catch(next);

});

gigsRouter.route('/add').post(jsonBodyParser, (req, res, next) => {
  const { gig_name, start_time } = req.body;
  const newGig = { gig_name, start_time };

  const fields = Object.entries(newGig);
  const keyError = fields.find(([key, value]) => (value === undefined && key))

  if (keyError)
    return res.status(400).json({
      error: `Missing '${keyError}' in request body`
    });

  GigsService.insertReview(req.app.get('db'), newGig)
    .then((review) => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${review.id}`))
        .json(GigsService.serializeReview(review));
    })
    .catch(next);
});

gigsRouter
  .route('/:thing_id')
  .all(GigsService.getById)
  .get((req, res) => {
    res.json(GigsService.serializeThing(res.thing));
  });

module.exports = gigsRouter;
