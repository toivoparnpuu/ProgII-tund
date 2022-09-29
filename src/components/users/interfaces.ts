interface INewUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface IUser extends INewUser {
    id: number;
}

interface IUserWithoutPassword {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export { INewUser, IUser, IUserWithoutPassword };
