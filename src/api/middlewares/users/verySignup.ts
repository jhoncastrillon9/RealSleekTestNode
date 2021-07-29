import User from '../../../models/users/user'
import Role from '../../../models/users/role'
import CompanyModel from '../../../models/companies/company'

export const checkUserForCreate = async (req: any, res: any, next: any) => {

    const { name, email, password, companyName } = req.body;
    //Valida la compañia
    if (typeof companyName != 'undefined' && companyName != '' && companyName != null) {
        const companyExists = await CompanyModel.findOne({ companyName: companyName })
        if (companyExists)
            return returnApplicationError(res, 'La compañia ya existe, consulta al administrador para un nuevo usuario')
    }


    const userExists = await User.findOne({ email: email })
    if (userExists)
        return returnApplicationError(res, 'El Email ya se encuentra registrado')

    next();
}

function returnApplicationError(res: any, message: String) {
    return res.status(400).json({ success: false, message: message })
}
