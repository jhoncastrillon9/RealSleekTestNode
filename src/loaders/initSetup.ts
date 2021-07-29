import Role from '../models/users/role'

export const CreateRoles = async () => {
    try {

        const countRoles = await Role.estimatedDocumentCount();

        if (countRoles > 0)
            return;

        const roles = await Promise.all([
            new Role({ roleName: 'SuperAdmin' }).save(),
            new Role({ roleName: 'Admin' }).save(),
            new Role({ roleName: 'User' }).save()
        ]);        
        return roles;
    } catch (error) {
        console.log(error);
    }
}