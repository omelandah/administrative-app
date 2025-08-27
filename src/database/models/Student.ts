import { DataTypes, Model, Sequelize, Optional, Association } from 'sequelize';
import { Teacher } from './Teacher';
import { StudentTeacher } from './StudentTeacher';

export interface StudentAttributes {
  id: string;
  email: string;
}

export interface StudentCreationAttributes
  extends Optional<StudentAttributes, 'id'> {}

export class Student
  extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes
{
  public id!: string;
  public email!: string;

  // association fields
  public teachers?: Teacher[];

  // Sequelize metadata
  public static associations: {
    teachers: Association<Student, Teacher>;
  };

  // ✅ typed associate function
  public static associate(models: {
    Teacher: typeof Teacher;
    StudentTeacher: typeof StudentTeacher;
  }) {
    Student.belongsToMany(models.Teacher, {
      through: models.StudentTeacher,
      foreignKey: 'studentUuid',
      otherKey: 'teacherUuid',
      as: 'teachers',
      onDelete: 'CASCADE',
    });
  }
}

export function initStudent(sequelize: Sequelize): typeof Student {
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
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'Student',
      tableName: 't_students',
    }
  );

  return Student;
}
