import express from 'express';
import { createSession , deleteSession, getSessionUser } from '../../controller/sessionController';
import { validate, sessionSchema } from './../../middleware/validationZod';
import { protect } from './../../controller/authController';

const router = express.Router();

router.post('/create', validate(sessionSchema), createSession);
router.get('/userSession', protect, getSessionUser);
router.get('/delete-userSession/:sessionId', protect, deleteSession);

export default router;