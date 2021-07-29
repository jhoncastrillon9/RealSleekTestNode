import userModel from '../models/users/user'
import companyModel from '../models/companies/company'
import { UserDTO } from '../dtos/UserDTO'
import { aplicationError } from '../errors/aplication.error'



const userService = {
    /**
     * Obtiene el usuario por id
     * @param id 
     * @returns 
     */
    getUser: async (id: string) => {

        const user = await userModel.findById(id);        
        if (!user) {            
            throw new aplicationError('Usuario no existe')
        } 
        
        const {_id,name,email,role,createdAt,updatedAt} = user;

        return {_id,name,email,role,createdAt,updatedAt};
    },

    /**
     * Consulta todos los usuarios
     * @returns 
     */
    getAlluser: async () => {
        var users: UserDTO[];
        users = await userModel.find();

        var listUsers = users.map(user => {

            return { name: user.name, email: user.email, role: user.role, _id: user._id, createdAt: user.createdAt, updatedAt: user.updatedAt };
        });

        return listUsers;
    },

    /**
     * Crea un usuario
     * @param body 
     * @returns 
     */
    createUser: async (body: any) => {

        const {name, email, password, companyName} = body;

        if (typeof companyName == 'undefined' || companyName == '' || companyName == null) {
            throw new aplicationError('El nombre de la compañia es obligatorio');
        } else {
            const companyExists = await companyModel.findOne({ companyName: companyName })
            if (companyExists)
                throw new aplicationError('La compañia ya existe, consulta al administrador para un nuevo usuario');
        }

        const newcompany = new companyModel({companyName});
        const newUser = new userModel({name, email, password, companyName});

        const userExists = await userModel.findOne({ email: email })

        if (userExists)
            throw new aplicationError('El Email ya se encuentra registrado');

        const companyCreated = await newcompany.save();
        newUser.companyId = companyCreated._id;
        return await newUser.save();
    },


    /**
     * Actualizar un usuario
     * @param req 
     * @param res 
     * @returns 
     */
    updateUser: async (id: String, body: any) => {       
        
        const {name, email} = body;
        const userUpdate = await userModel.findByIdAndUpdate(id, {name, email}, { new: true });

        if (!userUpdate) {

            throw new aplicationError('El Usuario a actualizar no existe')
        }       

        return {name, email};
    },

    /**
     * Elimina un usuario
     * @param id 
     * @returns 
     */
    deleteUser: async (id: String) => {
        const userDelete = await userModel.findByIdAndDelete(id);

        if (!userDelete) {

            throw new aplicationError('Usuario a eliminar no existe')
        }

        return userDelete;
    }

}

module.exports = userService;



