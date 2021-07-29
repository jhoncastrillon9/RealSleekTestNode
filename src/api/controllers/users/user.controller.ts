import { RequestHandler } from 'express'
import { aplicationError } from '../../../errors/aplication.error'
var userService = require('../../services/user.services');
import constant from '../../../config/constant'


/**
 * Obtiene el usuario por id
 * @param req 
 * @param res 
 */
export const getUser: RequestHandler = async (req, res) => {
    try {

        const user = await userService.getUser(req.params.id);
        return res.status(200).json({ success: true, message: constant.MSJ_OK_GENERAL, data: user })

    } catch (error) {       
        if (error instanceof aplicationError) {
            return res.status(400).json({ success: false, message: error.message })
        } else if (error instanceof Error) {
            return res.status(500).json({ success: false, message: constant.MSJ_ERROR_GENERAL });
        }
    }
}



/**
 * Consulta todos los usuarios
 * @param req 
 * @param res 
 * @returns 
 */
export const getAllUser: RequestHandler = async (req, res) => {

    try {
        var listUsers = await userService.getAlluser();
        return res.status(200).json({ success: true, message: constant.MSJ_OK_GENERAL, data: listUsers })

    } catch (error) {
     
        if (error instanceof aplicationError) {
            return res.status(400).json({ success: false, message: error.message })
        } else if (error instanceof Error) {
            return res.status(500).json({ success: false, message: constant.MSJ_ERROR_GENERAL });
        }
    }

}


/**
 * Crea un usuario
 * @param req 
 * @param res 
 * @returns 
 */
export const createUser: RequestHandler = async (req, res) => {
    try {
   
        const saveUser = await userService.createUser(req.body);

        return res.status(200).json({ success: true, message: 'Usuario creado exitosamente' })

    } catch (error) {       
        if (error instanceof aplicationError) {         
            return res.status(400).json({ success: false, message: error.message })
        } else if (error instanceof Error) {          
            return res.status(500).json({ success: false, message: constant.MSJ_ERROR_GENERAL });
        }
    }
}


/**
 * Actualizar un usuario
 * @param req 
 * @param res 
 * @returns 
 */
export const updateUser: RequestHandler = async (req, res) => {
    try {

        const userUpdate = await userService.updateUser(req.params.id, req.body);
        return res.status(200).json({ success: true, message: 'Usuario actualizado exitosamente', data: userUpdate })

    } catch (error) {       
        if (error instanceof aplicationError) {
            return res.status(400).json({ success: false, message: error.message })
        } else if (error instanceof Error) {
            return res.status(500).json({ success: false, message: constant.MSJ_ERROR_GENERAL });
        }
    }
}

/**
 * Eliminar un usuario
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteUser: RequestHandler = async (req, res) => {
    try {

        const userDelete = await userService.deleteUser(req.params.id);
        return res.status(200).json({ success: true, message: 'Usuario eliminado exitosamente' })

    } catch (error) {
       
        if (error instanceof aplicationError) {
            return res.status(400).json({ success: false, message: error.message })
        } else if (error instanceof Error) {
            return res.status(500).json({ success: false, message: constant.MSJ_ERROR_GENERAL });
        }
    }
}

