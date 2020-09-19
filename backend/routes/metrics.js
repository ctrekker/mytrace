const express = require('express');
const router = new express.Router();
const {requireAuth} = require('../security');
const MetricEntry = require('../models/MetricEntry');

router.get('/', requireAuth, async (req, res) => {
  if (!'ELECTRIC|NATURAL_GAS|TRANSPORTATION'.split('|').includes(req.body.source) && req.body.source) {
    res.status(400).send('Must be ELECTRIC|NATURAL_GAS|TRANSPORTATION');
    return;
  }

  const startDate = parseInt(req.query.startDate);
  const endDate = parseInt(req.query.endDate);
  const limit = parseInt(req.query.limit || '100');
  const source = req.query.source || {$in: ['ELECTRIC', 'NATURAL_GAS', 'TRANSPORTATION']};

  res.json(
    await MetricEntry.find({
      user: req.user._id,
      source: source,
      metricTimestamp: {
        $lt: endDate,
        $gt: startDate
      }
    }).limit(limit)
  );
});

router.post('/', requireAuth, async (req, res) => {
  if (!'ELECTRIC|NATURAL_GAS|TRANSPORTATION'.split('|').includes(req.body.source)) {
    res.status(400).send('Must be ELECTRIC|NATURAL_GAS|TRANSPORTATION');
    return;
  }

  res.json(
    await MetricEntry.create({
      user: req.user._id,
      source: req.body.source,
      data: JSON.parse(req.body.data || '{}'),
      metricTimestamp: req.body.metricTimestamp
    })
  )
});

router.put('/', requireAuth, async (req, res) => {
  res.json(
    await MetricEntry.updateOne({
      _id: req.user._id,
    }, req._id)
  );
});


router.get('/test', requireAuth, async (req, res) => {
  res.json(
    await MetricEntry
      .aggregate([{$match: {source: req.query.source, user: req.user._id}}])
  )
});

module.exports = router;