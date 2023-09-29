import express from 'express';
import userRoute from './api/userRoute'
import sessionRoute from './api/sessionRoute'
import productRoute from './api/productRoute'

const router = express.Router();

router.use('/users', userRoute);
router.use('/session', sessionRoute);
router.use('/product', productRoute);


export default router;