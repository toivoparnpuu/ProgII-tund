import { Request, Response } from "express";
import { INewComment } from "./interfaces";
import commentsService from "./services";

const commentsController = {
    getAllComments:(req: Request, res: Response) => {
        const comments = commentsService.getAllComments();
    
        res.status(200).json({
            success: true,
            message: 'List of all comments',
            comments,
        });
    }, 
    getCommentById:(req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const comment = commentsService.getCommentById(id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: `Comment not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Comment`,
            data: {
                comment,
            },
        });
    },
    createComment: (req: Request, res: Response) => {
        const { postId, content } = req.body;
        let { userId } = req.body;
        if (!postId || !content) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (postId, content)`,
            });
        }
        if (!userId) userId = null;

        const newComment: INewComment = {
            userId,
            postId,
            content,
        };

        const id: number = commentsService.createComment(newComment);

        return res.status(201).json({
            success: true,
            message: `comment with id ${id} created`,
        });
    },
    deleteComment: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const result = commentsService.deleteComment(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `Comment not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Comment deleted`,
        });
    },
};

export default commentsController;