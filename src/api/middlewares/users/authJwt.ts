import config from '../../../config'
import User from '../../../models/users/user'
import Role from '../../../models/users/role'
var jwt = require('jsonwebtoken');

/**
 * Verifica que el token si sea valido
 */
export const verifyToken = async (req: any, res: any, next: any) => {

    try {

        const token = req.headers["authorization"];

        if (!token)
            throw new Error;

        const tokenDecode = jwt.verify(token, config.JWT_SECRET);
        const user = await User.findById(tokenDecode.id);

        //Si el usuario esta correcto le carga el userId y el companyId al req
        if (!user)
            throw new Error;
        else {
            req.body.userId = user._id;
            req.body.companyId = user.companyId;
        }
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
    }

}

/**
 * Verifica si el usuario es superAdmin
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const isSuperAdmin = async (req: any, res: any, next: any) => {

    const rolExist = await validateRole(req, res, next, 'SuperAdmin');
    if (rolExist) {
        next();
        return;
    } else {
        return res.status(403).json({ success: false, message: 'Usuario no autorizado' });
    }
}

/**
 * Verifica si el usuario es Admin
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const isAdmin = async (req: any, res: any, next: any) => {

    const rolExist = await validateRole(req, res, next, 'Admin');
    console.log('rolExist' + rolExist);
    if (rolExist) {
        next();
        return;
    } else {
        return res.status(403).json({ success: false, message: 'Usuario no autorizado' });
    }
}


/**
 * Valida los roles
 * @param req 
 * @param res 
 * @param next 
 * @param roleName 
 * @returns 
 */
async function validateRole(req: any, res: any, next: any, roleName: String) {
    var roleExist = false;
    const user = await User.findById(req.body.userId);
    const roleAdmin = await Role.findOne({ roleName: roleName });

    const forr = await user.roles.forEach(function (roleId: any) {
        if (roleId.toString() == roleAdmin._id.toString()) {
            roleExist = true;
        }
    });

    return roleExist;
}
