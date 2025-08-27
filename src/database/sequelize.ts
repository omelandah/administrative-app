import { Sequelize } from 'sequelize';
import { initStudent, Student } from './models/Student';
import { initTeacher, Teacher } from './models/Teacher';
import { initStudentTeacher, StudentTeacher } from './models/StudentTeacher';
import {
  initStudentSuspension,
  StudentSuspension,
} from './models/StudentSuspension';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;

export const sequelize = new Sequelize(DB_DATABASE!, DB_USER!, DB_PASSWORD!, {
  host: DB_HOST,
  dialect: 'mysql',
  port: Number(DB_PORT),
});

// Initialize
initStudent(sequelize);
initTeacher(sequelize);
initStudentTeacher(sequelize);
initStudentSuspension(sequelize);

// Associations
Student.associate({ Teacher, StudentTeacher, StudentSuspension });
Teacher.associate({ Student, StudentTeacher, StudentSuspension });
