const express = require('express');
const {requireAuth} = require('../security');
const router = new express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const MetricEntry = require('../models/MetricEntry');

router.get('/users', requireAuth, (req, res) => {
  res.json(req.user);
});

router.post('/users', async (req, res) => {
  res.json(
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
  );
});

router.put('/users', requireAuth, async (req, res) => {
  delete req.body._id;
  delete req.body.password;
  res.json(
    await User.updateOne({
      _id: req.user._id
    }, req.body)
  );
});

router.delete('/users', requireAuth, async (req, res) => {
  res.json(
    await User.deleteOne({
      _id: req.user._id
    })
  );
});

router.post('/users/signIn', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send('No credentials provided');
    return;
  }

  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({email}).select('+password').exec();
  if (!user) {
    res.status(400).send('User with that email does not exist');
  }
  if (!(await user.comparePassword(password))) {
    res.status(400).send('User password is incorrect');
  }

  res.cookie('token', jwt.sign(user.toJSON(), process.env.JWT_SECRET));
  res.json(user);
});

router.get('/metricEntry', requireAuth, async (req, res) => {
  const startDate = parseInt(req.query.startDate);
  const endDate = parseInt(req.query.endDate);
  const limit = parseInt(req.query.limit || '100');

  res.json(
    await MetricEntry.find({
      metricTimestamp: {
        $lt: endDate,
        $gt: startDate
      }
    }).limit(limit)
  );
});

router.post('/metricEntry', requireAuth, async (req, res) => {
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

router.put('/metricEntry', requireAuth, async (req, res) => {
  res.json(
    await MetricEntry.updateOne({
      _id: req.user._id,
    }, req._id)
  );
});


module.exports = router;
