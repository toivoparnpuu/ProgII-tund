import { Request, Response } from "express";
import commentsService from "../comments/services";
import { INewPost, IPostToUpdate } from "./interfaces";
import postsService from "./services";

const postsController = {
    getAllPosts: (req: Request, res: Response) => {
        const postsWithStatusesAndUsers = postsService.getAllPosts();
        res.status(200).json({
            success: true,
            message: 'List of posts',
            posts: postsWithStatusesAndUsers,
        });
    },
    getPostById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const post = postsService.getPostById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: `Post not found`,
            });
        };
    
        const postWithStatusAndUser = postsService.getPostWithStatusAndUser(post);
        return res.status(200).json({
            success: true,
            message: `Post`,
            data: {
                post: postWithStatusAndUser,
            },
        });
    },
    getPostComment: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const comments = commentsService.findCommentsByPostId(id);
        return res.status(200).json({
            success: true,
            message: `Comments of post with id: ${id}`,
            data: {
                comments,
            },
        });
    },
    createPost: (req: Request, res: Response) => {
        const { title, content, userId, statusId } = req.body;
        if (!title || !content || !userId || !statusId) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (title, content, userId, statusId)`,
            });
        }
        const newPost: INewPost = {
            title,
            content,
            userId,
            statusId,
        };
        const id = postsService.createPost(newPost);
        return res.status(201).json({
            success: true,
            message: `Post with id ${id} created`,
        });
    },
    updatePost: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { title, content, statusId } = req.body;
        const post = postsService.getPostById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: `Post not found`,
            });
        }
        if (!title && !content && !statusId) {
            return res.status(400).json({
                success: false,
                message: `Nothing to change`,
            });
        }
        const postToUpdate: IPostToUpdate = {
            id,
            title,
            content,
            statusId,
        };

        postsService.updatePost(postToUpdate);
    
        return res.status(200).json({
            success: true,
            message: `Post updated`,
        });
    },
    deletePost: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const result = postsService.deletePost(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `Post not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Post deleted`,
        });
    },
};

export default postsController;
