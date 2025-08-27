import { DataTypes, Model, Sequelize, Optional, Association } from 'sequelize';
import { Student } from './Student';
import { Teacher } from './Teacher';

export interface StudentSuspensionAttributes {
  id: string;
  studentUuid: string;
  teacherUuid: string;
  suspendedAt: Date;
}

export interface StudentSuspensionCreationAttributes
  extends Optional<StudentSuspensionAttributes, 'id' | 'suspendedAt'> {}

export class StudentSuspension
  extends Model<
    StudentSuspensionAttributes,
    StudentSuspensionCreationAttributes
  >
  implements StudentSuspensionAttributes
{
  public id!: string;
  public studentUuid!: string;
  public teacherUuid!: string;
  public suspendedAt!: Date;

  // association fields
  public student?: Student;
  public teacher?: Teacher;

  public static associations: {
    student: Association<StudentSuspension, Student>;
    teacher: Association<StudentSuspension, Teacher>;
  };

  // ✅ typed associate function
  public static associate(models: {
    Student: typeof Student;
    Teacher: typeof Teacher;
  }) {
    StudentSuspension.belongsTo(models.Student, {
      foreignKey: 'studentUuid',
      as: 'student',
    });
    StudentSuspension.belongsTo(models.Teacher, {
      foreignKey: 'teacherUuid',
      as: 'teacher',
    });
  }
}

export function initStudentSuspension(
  sequelize: Sequelize
): typeof StudentSuspension {
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

  return StudentSuspension;
}
