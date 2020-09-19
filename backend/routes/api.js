const express = require('express');
const router = new express.Router();

const usersRouter = require('./users');
const metricsRouter = require('./metrics');

router.use('/users', usersRouter);
router.use('/metrics', metricsRouter);

module.exports = router;
