const registerService = require('../services/register.service');

const registerStudents = async (req, res) => {
  try {
    const { teacher, students } = req.body;

    if (!teacher || !students || !Array.isArray(students)) {
      return res
        .status(400)
        .json({ error: 'teacher and students are required' });
    }

    await registerService.registerStudentstoTeacher(teacher, students);

    return res.sendStatus(204);
  } catch (err) {
    console.log('Error in registerStudents: ', err.message);
    if (err.message.includes('not found')) {
      return res.status(404).json({ error: err.message });
    }

    return res.status(500).json({ error: 'Failed to register students' });
  }
};

module.exports = {
  registerStudents,
};
