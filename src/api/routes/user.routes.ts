import {Router} from 'express'
const router = Router();

import * as userController from '../controllers/users/user.controller'

//modulo de usuarios
router.get('/',userController.getAllUser);
router.get('/:id',userController.getUser);
router.post('/',userController.createUser);
router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);

export default router;