const express = require('express');

const GigsService = require('./gigs.service');
const bodyVal = require('../../middlewares/body.val');

const gigsRouter = express.Router();
const jsonBodyParser = express.json();

gigsRouter
  .route('/')
  .all(jsonBodyParser)
  .get((req, res, next) =>
    GigsService.getAllGigs(req.app.get('db'))
      .then((gigs) => {
        res.json(GigsService.serializeGigs(gigs));
      })
      .catch(next)
  )

  .post(bodyVal.gigBody, (req, res, next) =>
    GigsService.createGig(req.app.get('db'), res.newgig)
      .then((gig) => {
        res.status(201).json(GigsService.serializeGig(gig));
      })
      .catch(next)
  );

gigsRouter
  .route('/:id')
  .all(jsonBodyParser, (req, res, next) => {
    try {
      const gig = GigsService.getById(req.app.get('db'), req.body.gig_id);

      if (!gig) return res.status(404).json({ message: `gig doesn't exist` });
      res.gig = gig;
    } catch (error) {
      next(error);
    }

    return next();
  })
  .get((_, res) => res.json(GigsService.serializeGig(res.gig)))

  .delete((req, res) =>
    GigsService.deleteById(req.app.get('db'), res.gig.id).then(() =>
      res.json({ message: `gig "${res.gig.gig_name}" deleted` })
    )
  )

  .patch(bodyVal.gigBody, (req, res) =>
    GigsService.updateGig(
      req.app.get('db'),
      res.gig.id,
      res.newgig
    ).then(() => res.json({ message: `gig "${res.gig.gig_name}" deleted` }))
  );

module.exports = gigsRouter;
