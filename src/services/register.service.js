const teacherRepository = require('../repositories/teacher.repository');
const studentRepository = require('../repositories/student.repository');

const registerStudentstoTeacher = async (teacherEmail, studentEmails) => {
  const teacher = await teacherRepository.findTeacherByEmail(teacherEmail);
  if (!teacher) {
    throw new Error('Teacher not found');
  }

  const students = await studentRepository.findStudentByEmails(studentEmails);
  if (students.length !== studentEmails.length) {
    throw new Error('One or more students not found');
  }

  await teacher.addStudents(students);

  return true;
};

module.exports = {
  registerStudentstoTeacher,
};
