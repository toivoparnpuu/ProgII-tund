import { Request, Response } from "express";
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
    }
};

export default usersControllers;