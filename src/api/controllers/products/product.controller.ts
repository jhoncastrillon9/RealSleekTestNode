import { RequestHandler } from 'express'
import * as productService from '../../../services/products/product.service'
import constant from '../../../config/constant'
import * as baseController from '../base.Controller'


/**
 * Obtiene el producto por id
 * @param req 
 * @param res 
 */
export const getProduct: RequestHandler = async (req, res) => {
    try {
        await baseController.validateModel(req);
        const product = await productService.getProduct(req.params.id, req.body);
        return res.status(200).json({ success: true, message: constant.MSJ_OK_GENERAL, data: product })

    } catch (error) {
        baseController.validateErrorAndReturn(res, error);
    }
}



/**
 * Consulta todos los productos
 * @param req 
 * @param res 
 * @returns 
 */
export const getAllProduct: RequestHandler = async (req, res) => {

    try {
        await baseController.validateModel(req);
        var listUsers = await productService.getAllProduct(req.body);
        return res.status(200).json({ success: true, message: constant.MSJ_OK_GENERAL, data: listUsers })

    } catch (error) {
        baseController.validateErrorAndReturn(res, error);
    }

}


/**
 * Crea un producto
 * @param req 
 * @param res 
 * @returns 
 */
export const createProduct: RequestHandler = async (req, res) => {
    try {
        await baseController.validateModel(req);       
        const saveProduct = await productService.createProduct(req.body);

        return res.status(200).json({ success: true, message: 'Producto creado exitosamente', data: saveProduct})

    } catch (error) {
        baseController.validateErrorAndReturn(res, error);
    }
}


/**
 * Actualizar un producto
 * @param req 
 * @param res 
 * @returns 
 */
export const updateProduct: RequestHandler = async (req, res) => {
    try {
        await baseController.validateModel(req);
        const userUpdate = await productService.updateProduct(req.params.id, req.body);
        return res.status(200).json({ success: true, message: 'Producto actualizado exitosamente', data: userUpdate })

    } catch (error) {
        baseController.validateErrorAndReturn(res, error);
    }
}

/**
 * Eliminar un usuario
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteProduct: RequestHandler = async (req, res) => {
    try {
        await baseController.validateModel(req);
        const userDelete = await productService.deleteProduct(req.params.id, req.body);
        return res.status(200).json({ success: true, message: 'Producto eliminado exitosamente' })

    } catch (error) {
        baseController.validateErrorAndReturn(res, error);
    }
}

