const express = require('express');
const {requireAuth} = require('../../security');
const router = new express.Router();

router.get('/users', requireAuth, (req, res) => {

});

router.post('/users', (req, res) => {

});

router.put('/users/:userId', requireAuth, (req, res) => {

});

router.delete('/users/:userId', requireAuth, (req, res) => {

});

router.post('/users/signIn', (req, res) => {

});
