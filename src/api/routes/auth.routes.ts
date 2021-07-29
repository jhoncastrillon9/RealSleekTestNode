import { Router } from 'express'
import * as authController from '../controllers/users/auth.controller'
import * as Validation from '../../api/validations/validation'
const router = Router();

//modulo de autenticación
router.post('/signin', Validation.forSignIn, authController.signin);
router.post('/signup', Validation.forSignUp, authController.signup);


export default router;