import express from 'express';
import registerController from '../controllers/register.controller';

const route = express.Router();
route.post('/register', registerController.registerStudents);
route.get('/register', registerController.registerStudents);

export default route;
