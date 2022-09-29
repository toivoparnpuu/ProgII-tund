import { Request, Response } from "express";
import { IUserWithPassword } from "./interfaces";
import usersServices from "./services";
const usersControllers = {
    getAllUsers : (req: Request, res: Response) => {
        // päringud on viidud services.ts faili.
        const usersWithoutPassword = usersServices.getAllUsers();
        res.status(200).json({
            success: true,
            message: 'List of users',
            users: usersWithoutPassword,
        });
    },
    getUserById : (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        let user: IUserWithPassword | undefined = usersServices.findUserById(id);
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
    }
};

export default usersControllers;