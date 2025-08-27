const Student = require('../database/models/Student');

const findStudentByEmails = async (emails) => {
  return await Student.findAll({ where: { email: emails } });
};

module.exports = {
  findStudentByEmails,
};
