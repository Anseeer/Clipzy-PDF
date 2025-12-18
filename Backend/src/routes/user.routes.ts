import express from "express";
import { UserController } from "../controllers/user/user.controller";
import { UserRepository } from "../repositories/user/user.repo";
import { UserService } from "../services/user/user.service";
import { auth } from "../middlewares/auth.middleware";

const Router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

Router.post('/register', userController.register)
Router.post('/login', userController.login)
Router.post('/logout', userController.logout)
Router.post('/refresh-token', userController.refreshToken)
Router.get('/me', auth, userController.fetchData)

export default Router;