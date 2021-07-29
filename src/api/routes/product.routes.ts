import { Router } from 'express'
import { authJwt } from '../../api/middlewares/users'
import * as productController from '../controllers/products/product.controller'
import * as Validation from '../../api/validations/validation'
const router = Router();

//modulo de usuarios
router.get('/', [authJwt.verifyToken], productController.getAllProduct);
router.get('/:id', [authJwt.verifyToken], productController.getProduct);
router.post('/', [authJwt.verifyToken].concat(Validation.forCreateProduct), productController.createProduct);
router.put('/:id', [authJwt.verifyToken].concat(Validation.forUpdateProduct), productController.updateProduct);
router.delete('/:id', [authJwt.verifyToken], productController.deleteProduct);

export default router;