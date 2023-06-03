import express, { Router } from 'express';
import * as middleware from '../../middleware/validation';
import * as userController from '../../controllers/userController';

const router: Router = express.Router();

router.post('/register', middleware.signUpValidation, userController.createUser); // signup route

router.post('/login', middleware.loginValidation, userController.loginUser); // login route

router.put('/changePassword', middleware.changePassword, userController.changePasswordController)


export default router;
