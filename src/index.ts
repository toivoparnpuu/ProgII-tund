import express from 'express';
import logger from './components/general/middlewares';
import usersRoutes from './components/users/routes';
import postStatusesRoutes from './components/postsStatuses/routes';
import commentsRoutes from './components/comments/routes';
import postsRoutes from './components/posts/routes';
import generalRoutes from './components/general/routes';

const app = express();
const PORT = 3000;
const apiPath = '/api/v1'

app.use(express.json());
app.use(logger);

app.use(`${apiPath}/health`, generalRoutes);
app.use(`${apiPath}/users`, usersRoutes);
app.use(`${apiPath}/postStatuses`, postStatusesRoutes);
app.use(`${apiPath}/comments`, commentsRoutes);
app.use(`${apiPath}/posts`, postsRoutes);

app.listen(PORT, () => {
    console.log('Server is running');
});
