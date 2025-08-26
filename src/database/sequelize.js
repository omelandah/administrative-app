const { Sequelize } = require('sequelize');
const modelDefiners = require('./models');
require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  port: DB_PORT,
});

for (const modelDefiner of modelDefiners) {
  try {
    modelDefiner(sequelize);
  } catch (err) {
    throw new Error('MODEL_IS_CORRUPTED', err);
  }
}

for (const model of Object.keys(sequelize.modles)) {
  if (sequelize.models[model].associate) {
    sequelize.models[model].associate(sequelize.models);
  }
}

module.exports.sequelize = sequelize;
