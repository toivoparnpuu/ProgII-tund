import express from 'express';
import postsController from './controllers';
const postsRoutes = express.Router();

postsRoutes
    .get('/', postsController.getAllPosts)
    .get('/:id', postsController.getPostById)
    .get('/:id/comments', postsController.getPostComment)
    .post('/', postsController.createPost)
    .patch('/:id', postsController.updatePost)
    .delete('/:id', postsController.deletePost);

export default postsRoutes;
