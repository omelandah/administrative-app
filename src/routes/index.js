const express = require('express');
const teacherRoute = require('./teacher.route');
const route = express.Router();

route.use('/', teacherRoute);

module.exports = route;
