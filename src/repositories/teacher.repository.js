const Teacher = require('../database/models/Teacher');

const findTeacherByEmail = async (email) => {
  return await Teacher.findOne({ where: { email } });
};

module.exports = {
  findTeacherByEmail,
};
