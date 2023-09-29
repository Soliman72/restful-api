import express from 'express';
import { DeleteProduct, UpdateProduct, createProduct, findProduct } from '../../controller/productController';

import { validate, productSchema } from '../../middleware/validationZod';
import { protect } from '../../controller/authController';


const router = express.Router();

router.post('/create', protect, validate(productSchema) , createProduct);
router.get('/:productId', protect , findProduct);
router.patch('/update/:productId', protect , UpdateProduct);
router.delete('/delete/:productId', protect , DeleteProduct);

export default router;