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
    }
};

export default usersServices;