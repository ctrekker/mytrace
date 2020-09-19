const express = require('express');
const router = new express.Router();
const {requireAuth} = require('../security');
const MetricEntry = require('../models/MetricEntry');
const moment = require('moment');

router.get('/', requireAuth, async (req, res) => {
  const startDate = parseInt(req.query.startDate);
  const endDate = parseInt(req.query.endDate);
  const limit = parseInt(req.query.limit || '100');
  
  res.json(
    await MetricEntry.find({
      user: req.user._id,
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
      metricTimestamp: new Date(parseInt(req.body.metricTimestamp))
    })
  )
});

router.put('/', requireAuth, async (req, res) => {
  delete req.body._id;
  delete req.body.updatedAt;
  delete req.body.createdAt;
  delete req.body.carbonImpact;
  delete req.body.metricTimestamp;
  delete req.body.user;
  
  res.json(
    await MetricEntry.updateOne({
      _id: req.user._id,
    }, req.body)
  );
});


router.get('/aggregate', requireAuth, async (req, res) => {
  let startDate;
  let endDate;
  const metricTimestamp = {};
  if(req.query.startDate) {
    startDate = parseInt(req.query.startDate);
    metricTimestamp['$gt'] = startDate;
  }
  if(req.query.endDate) {
    endDate = parseInt(req.query.endDate);
    metricTimestamp['$lt'] = endDate;
  }
  
  const mode = req.query.mode;
  const interval = req.query.interval; // DAY, WEEK, MONTH, YEAR, ALL
  
  const pipeline = [
    {
      $match: {
        user: req.user._id
      }
    },
    {
      $group: {
        _id: '$source',
        total: { $sum: '$data' }
      }
    }
  ];
  if(startDate || endDate) {
    pipeline[0].$match.metricTimestamp = metricTimestamp;
  }
  
  if(mode.toUpperCase() === 'SUM') {
    res.json(
      await MetricEntry.aggregate(pipeline)
    );
  }
});

module.exports = router;