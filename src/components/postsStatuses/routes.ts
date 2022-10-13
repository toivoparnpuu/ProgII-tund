import express from 'express';
import postStatusesController from './controllers';
const postStatusesRoutes = express.Router();

postStatusesRoutes
    .get('/', postStatusesController.getAllPostStatuses)
    .get('/:id', postStatusesController.getPostStatusById);

export default postStatusesRoutes;
