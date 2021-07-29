import { aplicationError } from '../../errors/aplication.error'
import constant from '../../config/constant'
const { validationResult } = require('express-validator')

export async function validateModel(req: any) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        var message = ''
        await errors.array().forEach(function (error: any) {
            message = message + ' ' + error.msg
        })

        throw new aplicationError(message)
    }
}

export async function validateErrorAndReturn(res: any, error: any) {
    //console.log(error);
    if (error instanceof aplicationError) {
        return res.status(400).json({ success: false, message: error.message })
    } else if (error instanceof Error) {
        return res.status(500).json({ success: false, message: constant.MSJ_ERROR_GENERAL });
    }
}