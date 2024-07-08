import { Router } from 'express';
import UsersController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userController = new UsersController();

const router = Router();

router.post('/login', Validations.validateLogin, (req, res) => userController.login(req, res));
router.get('/login/role', Validations.validateToken, (req, res) => userController
  .getByRole(req, res));

export default router;
