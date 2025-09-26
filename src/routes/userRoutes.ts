import { Router } from 'express';
import { register, login } from '../controllers/userController';

const router = Router();

router.post('/users/register', register);
router.post('/users/login', login);

export default router;
