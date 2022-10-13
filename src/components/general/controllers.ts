import { Request, Response } from 'express';

const generalController = {
    health: (req: Request, res: Response) => {
        res.status(200).json({
            message: 'Hello world!',
        });
    }
};

export default generalController;
