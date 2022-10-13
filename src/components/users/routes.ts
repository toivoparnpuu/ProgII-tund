import express from 'express';
import usersControllers from './controllers';
import usersMiddlewares from './middlewares';
const usersRoutes = express.Router();

usersRoutes
    .get('/', usersControllers.getAllUsers)
    .get('/:id', usersControllers.getUserById)
    .post('/', usersMiddlewares.checkCreateUserData, usersControllers.createUser)
    .patch('/:id', usersControllers.updateUser)
    .delete('/:id', usersControllers.deleteUser);

export default usersRoutes;
