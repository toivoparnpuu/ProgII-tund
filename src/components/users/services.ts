import { users } from "../../mockData";
import { INewUser, IUser, IUserWithoutPassword } from "./interfaces";

const usersServices = {
    findUserById: (id: number): IUser | undefined => {
        let user: IUser | undefined = users.find(element => element.id === id);
        return user;
    },
    getUserWithoutPassword: (user: IUser): IUserWithoutPassword => {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
    },
    unknownUser: (): IUser => {
        return {
                id: 0,
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@doe.com',
                password: 'jane',
            };
    },
    getAllUsers: () => {
        const usersWithoutPassword = users.map(user => {
            const userWithoutPassword = usersServices.getUserWithoutPassword(user);
            return userWithoutPassword;
        });
        return usersWithoutPassword;
    },
    createUser: (user: INewUser): number => {
        const id = users.length + 1;
        const newUser: IUser = {
            id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        };
        users.push(newUser);
        return id;
    },
    updateUser: (userToUpdate: IUser ): Boolean => {
        const { id, firstName, lastName, email, password } = userToUpdate;
        const user = usersServices.findUserById(id);
        if (user && firstName) user.firstName = firstName;
        if (user && lastName) user.lastName = lastName;
        if (user && email) user.email = email;
        if (user && password) user.password = password;
        return true;
    },
    deleteUser: (id: number): Boolean => {
        const index = users.findIndex(element => element.id === id);
        if(index === -1) return false;
        users.splice(index, 1);
        return true;
    }
};

export default usersServices;