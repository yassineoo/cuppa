import express from 'express';
import LoginController from '../controllers/auth.Controller';
const route = express.Router();

route.get('/login', LoginController.login); // placeid
export default route;