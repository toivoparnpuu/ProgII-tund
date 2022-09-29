interface INewUser {
    firstName: string;
    lastName: string;
    email: string;
}

interface IUser extends INewUser {
    id: number;
}

interface IUserWithPassword extends IUser {
    password: string;
}

//moodutan ühe objekti kuhu sisse lisan interface-d
export { INewUser, IUser, IUserWithPassword};
