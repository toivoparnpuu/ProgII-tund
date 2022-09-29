
/*
--------------------------------------------------
Kasutajatega seotud funktsioonid
--------------------------------------------------
*/

import { users } from "../../mockData";
import { IUserWithPassword, IUser } from "./interfaces";

const usersServices = {
    findUserById : (id: number): IUserWithPassword | undefined => {
        let user: IUserWithPassword | undefined = users.find(element => element.id === id);
        return user;
    },
    getUserWithoutPassword : (user: IUserWithPassword): IUser => {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
    },
    unknownUser : (): IUserWithPassword => {
        return {
                id: 0,
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@doe.com',
                password: 'jane',
            };
    }
};

export default usersServices;

