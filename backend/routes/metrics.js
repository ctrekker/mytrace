const express = require('express');
const router = new express.Router();
const {requireAuth} = require('../security');
const MetricEntry = require('../models/MetricEntry');
const moment = require('moment');

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
      metricTimestamp: req.body.metricTimestamp ? new Date(parseInt(req.body.metricTimestamp)) : undefined
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
  if (req.query.startDate) {
    startDate = parseInt(req.query.startDate);
    metricTimestamp.$gt = new Date(startDate);
  }
  if (req.query.endDate) {
    endDate = parseInt(req.query.endDate);
    metricTimestamp.$lt = new Date(endDate);
  } else {
    endDate = Date.now();
  }

  const mode = (req.query.mode || 'sum').toUpperCase(); // SUM, AVG
  const interval = (req.query.interval || 'monthly').toUpperCase(); // DAY, WEEK, MONTH, YEAR, ALL

  const pipeline = [
    {
      $match: {
        user: req.user._id,
      }
    },
    {
      $group: {
        _id: '$source',
        total: {$sum: '$data'},
        first: {$min: "$metricTimestamp"},
        last: {$max: "$metricTimestamp"}
      }
    }
  ];

  if (Object.keys(metricTimestamp).length > 0) {
    pipeline[0].$match.metricTimestamp = metricTimestamp;
  }

  const aggregate = await MetricEntry.aggregate(pipeline);
  if (mode === 'SUM') {
    res.json(
      aggregate
    );
  } else if (mode === 'AVG') {
    if (startDate === undefined && interval !== 'ALL') {
      res.status(400).send('A start date must be included');
    }
    const daysInInterval = moment(aggregate[0].last).diff(moment(aggregate[0].first), 'days');
    const intervalUnits = {
      'DAY': 1,
      'WEEK': 7,
      'MONTH': 30.5,
      'YEAR': 365
    };

    let trueInterval = daysInInterval / intervalUnits[interval];
    if(trueInterval === 0){
      trueInterval = 1;
    }

    for (let aggregateGroup of aggregate) {
      aggregateGroup.total /= trueInterval;
    }

    res.json(aggregate);
  }
});


router.get('/emissions', requireAuth, async (req, res) => {
  let startDate;
  let endDate;
  const metricTimestamp = {};
  if (req.query.startDate) {
    startDate = parseInt(req.query.startDate);
    metricTimestamp.$gt = new Date(startDate);
  }
  if (req.query.endDate) {
    endDate = parseInt(req.query.endDate);
    metricTimestamp.$lt = new Date(endDate);
  } else {
    endDate = Date.now();
  }

  const mode = (req.query.mode || 'sum').toUpperCase(); // SUM, AVG
  const interval = (req.query.interval || 'all').toUpperCase(); // DAY, WEEK, MONTH, YEAR, ALL

  const pipeline = [
    {
      $match: { user: req.user._id, }
    },
    {
      $group: {
        _id: req.user._id,
        totalEmissions: { $sum: "$carbonImpact" },
        first: {$min: "$metricTimestamp"},
        last: {$max: "$metricTimestamp"}
      }
    }
  ];

  if (Object.keys(metricTimestamp).length > 0) {
    pipeline[0].$match.metricTimestamp = metricTimestamp;
  }

  const aggregate = await MetricEntry.aggregate(pipeline);

  if (mode === 'SUM') {
    res.json(
      aggregate
    );
  } else if (mode === 'AVG') {
    if (startDate === undefined && interval !== 'ALL') {
      res.status(400).send('A start date must be included');
    }
    const daysInInterval = moment(aggregate[0].last).diff(moment(aggregate[0].first), 'days');
    const intervalUnits = {
      'DAY': 1,
      'WEEK': 7,
      'MONTH': 30.5,
      'YEAR': 365
    };


    let trueInterval = daysInInterval / intervalUnits[interval];
    if(trueInterval === 0){
      trueInterval = 1;
    }

    for (let aggregateGroup of aggregate) {
      aggregateGroup.totalEmissions /= trueInterval;
    }

    res.json(aggregate);
  }

});

module.exports = router;