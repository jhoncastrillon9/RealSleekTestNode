import User from '../../models/users/user'
import Role from '../../models/users/role'
import companyModel from '../../models/companies/company'
import { aplicationError } from '../../errors/aplication.error'
import config from '../../config/index'
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

/**
 * Crea un usuario
 * @param body 
 * @returns 
 */
export const signIn = async (body: any) => {
    const { email, password } = body;

    const userFound = await User.findOne({ email: email }).populate("role");
    if (!userFound) {
        throw new aplicationError('Email o constraseña incorrecto');
    }

    const matchPassword = await comparePassword(password, userFound.password);
    if (!matchPassword) {
        throw new aplicationError('Email o constraseña incorrecto');
    }

    //Generar Token 
    const token = generateToken(userFound);

    return token;
}


/**
 * Actualizar un usuario
 * @param req 
 * @param res 
 * @returns 
 */
export const signUp = async (body: any) => {

    const { name, email, password, companyName } = body;

    const newcompany = new companyModel({ companyName, active: true });
    const newUser = new User({
        name,
        email,
        password: await encryptPassword(password),
        companyName
    });

    //Se crean compañia
    const companyCreated = await newcompany.save();

    //Se setan propiedades adicionales al usuario y se crea el usuario
    newUser.companyId = companyCreated._id;
    const roleDefault = await Role.findOne({ roleName: 'User' });
    newUser.roles = [roleDefault._id]
    const userCreated = await newUser.save();

    //Generar Token 
    const token = generateToken(userCreated);

    return token;
}

export const encryptPassword = async (password: String) => {
    var salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (password: String, recivePassword: String) => {
    return await bcrypt.compare(password, recivePassword);
}

function generateToken(user: any) {
    return jwt.sign({ id: user._id, name: user.name, email: user.email }, config.JWT_SECRET, {
        expiresIn: 86400 //tiempo de expiración
    })
}
