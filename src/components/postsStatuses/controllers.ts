import { Request, Response } from "express";
import { IPostStatus } from "./interfaces";
import postStatusesService from "./services";

const postStatusesController = {
    getAllPostStatuses: (req: Request, res: Response) => {
        const postStatuses: IPostStatus[] = postStatusesService.getAllPostStatuses();
        res.status(200).json({
            success: true,
            message: 'List of post statuses',
            postStatuses,
        });
    },
    getPostStatusById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const postStatus: IPostStatus | undefined = postStatusesService.getPostStatusById(id);
        if (!postStatus) {
            return res.status(404).json({
                success: false,
                message: `Post status not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Post status`,
            data: {
                postStatus,
            },
        });
    }
};

export default postStatusesController;
