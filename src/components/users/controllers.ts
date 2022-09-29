import { Request, Response } from "express";
import { INewUser, IUser } from "./interfaces";
import usersServices from "./services";

const usersControllers = {
    getAllUsers: (req: Request, res: Response) => {
        const usersWithoutPassword = usersServices.getAllUsers();
        res.status(200).json({
            success: true,
            message: 'List of users',
            users: usersWithoutPassword,
        });
    },
    getUserById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        let user: IUser | undefined = usersServices.findUserById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found`,
            });
        }
        const userWithoutPassword = usersServices.getUserWithoutPassword(user);
        return res.status(200).json({
            success: true,
            message: `User`,
            data: {
                user: userWithoutPassword
            },
        });
    },
    createUser: (req: Request, res: Response) => {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (firstName, lastName, email, password)`,
            });
        };
        const newUser: INewUser = {
            firstName,
            lastName,
            email,
            password
        };
        const id = usersServices.createUser(newUser);
        return res.status(201).json({
            success: true,
            message: `User with id ${id} created`,
        });
    }
};

export default usersControllers;