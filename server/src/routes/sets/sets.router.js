const express = require('express');

const SetsService = require('./sets.service');
const bodyVal = require('../../middlewares/body.val');

const setsRouter = express.Router();
const jsonBodyParser = express.json();

setsRouter
  .route('/')
  .all(jsonBodyParser)
  .get((req, res, next) =>
    SetsService.getAllSets(req.app.get('db'))
      .then((sets) => {
        res.json(SetsService.serializeSets(sets));
      })
      .catch(next)
  )

  .post(bodyVal.setBody, (req, res, next) =>
    SetsService.createSet(req.app.get('db'), res.newset)
      .then((set) => {
        res.status(201).json(SetsService.serializeSet(set));
      })
      .catch(next)
  );

setsRouter
  .route('/:id')
  .all(jsonBodyParser, (req, res, next) => {
    try {
      const set = SetsService.getById(req.app.get('db'), req.body.set_id);

      if (!set) return res.status(404).json({ message: `set doesn't exist` });
      res.set = set;
    } catch (error) {
      next(error);
    }

    return next();
  })
  .get((_, res) => res.json(SetsService.serializeSet(res.set)))

  .delete((req, res) =>
    SetsService.deleteById(req.app.get('db'), res.set.id).then(() =>
      res.json({ message: `set "${res.set.set_name}" deleted` })
    )
  )

  .patch(bodyVal.setBody, (req, res) =>
    SetsService.updateset(
      req.app.get('db'),
      res.set.id,
      res.newset
    ).then(() => res.json({ message: `Set "${res.set.set_name}" deleted` }))
  );

module.exports = setsRouter