import express from 'express'
import ProductModel from '../../models/products/product'
import { aplicationError } from '../../errors/aplication.error'

/**
 * Obtiene el producto por id
 * @param id 
 * @returns 
 */
export const getProduct = async (id: String, body: any) => {
    const product = await ProductModel.findOne({_id:id, companyId :body.companyId});    
    if (!product) {
        throw new aplicationError('El producto no existe');
    }

    return product;
}


/**
 * Consulta todos los productos
 * @returns 
 */
export const getAllProduct = async (body: any) => {

    const listProducts = await ProductModel.find({companyId:body.companyId});
    return listProducts;
}

/**
 * Crea un producto
 * @param body 
 * @returns 
 */
export const createProduct = async (body: any) => {

    const { productName, category, price, urlImg, companyId } = body;    
    const entityProduct = new ProductModel({ productName, category, price, urlImg, companyId });    
    const newProduct = await entityProduct.save();

    return newProduct;
}


/**
 * Actualizar un producto
 * @param req 
 * @param res 
 * @returns 
 */
export const updateProduct = async (id: String, body: any) => {

    const productUpdate = await ProductModel.findOneAndUpdate({_id:id, companyId :body.companyId}, body, { new: true });
    if (!productUpdate)
        throw new aplicationError('El producto a actualizar no existe')
    
    return productUpdate;
}

/**
 * Elimina un usuario
 * @param id 
 * @returns 
 */
export const deleteProduct = async (id: String, body: any) => {    

    const ProductForDelete = await ProductModel.findOneAndDelete({_id:id, companyId :body.companyId});
    if (!ProductForDelete) {

        throw new aplicationError('El producto a eliminar no existe')
    }

    return ProductForDelete;
}