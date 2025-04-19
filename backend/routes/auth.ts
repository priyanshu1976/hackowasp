import express from 'express';
import { signup, login } from '../controllers/authcontroller';

const router = express.Router();

// @ts-expect-error
router.post('/signup', signup);


// @ts-expect-error
router.post('/login', login);

export default router;
