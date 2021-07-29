import { RequestHandler } from 'express'
import * as authService from '../../../services/users/auth.service'
import * as baseController from '../base.Controller'

/**
 * Login del usuario
 * @param req 
 * @param res 
 * @returns 
 */
export const signin: RequestHandler = async (req, res) => {
    try {
        await baseController.validateModel(req);
        const token = await authService.signIn(req.body);

        return res.status(200).json({ success: true, message: 'Autenticación exitosa', token: token })

    } catch (error) {
        baseController.validateErrorAndReturn(res, error);
    }
}


/**
 * registrar un usuario
 * @param req 
 * @param res 
 * @returns 
 */
export const signup: RequestHandler = async (req, res) => {
    try {
        await baseController.validateModel(req);
        const token = await authService.signUp(req.body);

        return res.status(200).json({ success: true, message: 'Registro exitoso', token: token })

    } catch (error) {
        baseController.validateErrorAndReturn(res, error);
    }
}