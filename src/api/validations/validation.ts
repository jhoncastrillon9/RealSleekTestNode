import { verySignup } from '../../api/middlewares/users'
const { body, param } = require('express-validator')

/**Validaciones genericas */
export const forParamId = [
    param('id').notEmpty().withMessage('El id es obligatorio.'),
]


/**validaciones para Autenticarse */
export const forSignIn = [
    body('email').isEmail().withMessage('El email no es valido.'),
    body('password').notEmpty().withMessage('La contraseña es obligatorio.'),
    body('password').isLength({ min: 4, max: 20 }).withMessage('La contraseña debe tener mínimo 4 caracteres y máximo 20.')
];

export const forSignUp = [
    body('companyName').notEmpty().withMessage('El nombre de la compañia es obligatorio.'),
    verySignup.checkUserForCreate
].concat(forSignIn);

/**validaciones para producto */
export const forCreateProduct = [
    body('productName').notEmpty().withMessage('El nombre del producto es obligatorio.'),
];

export const forUpdateProduct = forCreateProduct;

