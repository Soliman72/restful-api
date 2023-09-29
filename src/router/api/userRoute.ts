import express from 'express';
import { register } from '../../controller/authController';
import {validate, userSchema} from './../../middleware/validationZod';

const router = express.Router();


router.post('/register', validate(userSchema) , register);

export default router;