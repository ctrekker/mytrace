const express = require('express');
const {requireAuth} = require('../security');
const router = new express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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

router.put('/users/:userId', requireAuth, async (req, res) => {
  delete req.body.id;
  delete req.body.password;
  res.json(
    await User.updateOne({
      _id: req.user._id
    }, req.body)
  );
});

router.delete('/users/:userId', requireAuth, async (req, res) => {
  res.json(
    await User.deleteOne({
      _id: req.user._id
    })
  );
});

router.post('/users/signIn', async (req, res) => {
  if(!req.body.email || !req.body.password) {
    res.status(400).send('No credentials provided');
    return;
  }
  
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email }).select('+password').exec();
  if(!user) {
    res.status(400).send('User with that email does not exist');
  }
  if(!(await user.comparePassword(password))) {
    res.status(400).send('User password is incorrect');
  }
  
  res.cookie('token', jwt.sign(user.toJSON(), process.env.JWT_SECRET));
  res.json(user);
});

module.exports = router;
