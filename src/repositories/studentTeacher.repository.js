const { Sequelize } = require('sequelize');
const {
  models: { StudentTeacher },
} = require('../database');

const { Op } = Sequelize;

const save = async (body) => {
  return await StudentTeacher.create(body);
};
