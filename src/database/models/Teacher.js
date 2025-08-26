const { DataTypes, Model, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  class Teacher extends Model {}

  Teacher.init(
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
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'Teacher',
      tableName: 't_teachers',
    }
  );

  Teacher.associate = (models) => {
    Teacher.belongsToMany(models.Student, {
      through: models.StudentTeacher,
      foreignKey: 'teacherUuid',
      otherKey: 'studentUuid',
      as: 'students',
      onDelete: 'CASCADE',
    });
    Teacher.belongsToMany(models.Student, {
      through: models.StudentSuspension,
      foreignKey: 'teacherUuid',
      otherKey: 'studentUuid',
      as: 'suspendedStudents',
      onDelete: 'CASCADE',
    });
  };

  return Teacher;
};
