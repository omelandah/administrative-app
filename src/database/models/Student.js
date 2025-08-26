const { DataTypes, Model, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  class Student extends Model {}

  Student.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        field: 'uuid',
      },
      email: {
        type: DataTypes.STRING(56),
        allowNull: false,
        field: 'email',
      },
      isSuspended: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'is_suspended',
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'Student',
      tableName: 't_students',
    }
  );

  Student.associate = (models) => {
    Student.belongsToMany(models.Teacher, {
      through: models.StudentTeacher,
      foreignKey: 'studentUuid',
      otherKey: 'teacherUuid',
      as: 'teachers',
      onDelete: 'CASCADE',
    });
    Student.belongsToMany(models.Teacher, {
      through: models.StudentSuspension,
      foreignKey: 'studentUuid',
      otherKey: 'teacherUuid',
      as: 'suspendedByTeachers',
      onDelete: 'CASCADE',
    });
  };

  return Student;
};
