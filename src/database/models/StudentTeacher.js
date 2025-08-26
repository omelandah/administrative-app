const { DataTypes, Model, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  class StudentTeacher extends Model {}

  StudentTeacher.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      studentUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 't_students',
          key: 'uuid',
        },
        field: 'student_uuid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      teacherUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 't_teachers',
          key: 'uuid',
        },
        field: 'teacher_uuid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'StudentTeacher',
      tableName: 't_student_teacher',
    }
  );

  StudentTeacher.associate = (models) => {
    StudentTeacher.belongsTo(models.Student, {
      foreignKey: 'studentUuid',
      as: 'student',
    });

    StudentTeacher.belongsTo(models.Teacher, {
      foreignKey: 'teacherUuid',
      as: 'teacher',
    });
  };

  return StudentTeacher;
};
