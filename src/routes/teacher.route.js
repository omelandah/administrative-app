const express = require('express');
const route = express.Router();
const registerController = require('../controllers/register.controller');

route.get('/register', registerController.registerStudents);

module.exports = route;
