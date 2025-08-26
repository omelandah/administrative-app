const { DataTypes, Model, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  class StudentSuspension extends Model {}

  StudentSuspension.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        field: 'uuid',
        primaryKey: true,
      },
      studentUuid: {
        type: DataTypes.UUID,
        references: {
          model: 't_students',
          key: 'uuid',
        },
        field: 'student_uuid',
        allowNull: false,
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
      suspendedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'StudentSuspension',
      tableName: 't_student_suspensions',
    }
  );

  StudentSuspension.associate = (models) => {
    StudentSuspension.belongsTo(models.Student, {
      foreignKey: 'studentUuid',
      as: 'student',
    });
    StudentSuspension.belongsTo(models.Teacher, {
      foreignKey: 'teacherUuid',
      as: 'teacher',
    });
  };

  return StudentSuspension;
};
