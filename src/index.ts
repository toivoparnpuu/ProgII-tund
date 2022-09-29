import express, { Request, Response } from 'express';
import { INewUser, IUser } from './components/users/interfaces';
import { IPost, INewPost } from './components/posts/interfaces';
import { IComment, INewComment } from './components/comments/interfaces';
import { users, postStatuses, posts, comments } from './mockData';
import usersServices from './components/users/services';
import usersControllers from './components/users/controllers';
import { IPostStatus } from './components/poststatus/interfaces';

const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint API töötamise kontrollimiseks
app.get('/api/v1/health', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Hello world!',
    });
});

/*
--------------------------------------------------
Kasutajatega seotud endpoindid
--------------------------------------------------
*/


// Kõikide kasutajate pärimise endpoint
app.get('/api/v1/users', usersControllers.getAllUsers);

// Kasutaja pärimine id alusel
app.get('/api/v1/users/:id', usersControllers.getUserById);

// Kasutaja loomine
app.post('/api/v1/users', usersControllers.createUser);

// Kasutaja muutmine
app.patch('/api/v1/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, email, password } = req.body;
    const user: IUser | undefined = usersServices.findUserById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found`,
        });
    }
    if (!firstName && !lastName && !email && !password) {
        return res.status(400).json({
            success: false,
            message: `Nothing to change`,
        });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) user.password = password;

    return res.status(200).json({
        success: true,
        message: `User updated`,
    });
});

// Kasutaja kustutamine
app.delete('/api/v1/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `User not found`,
        });
    }
    users.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `User deleted`,
    });
});

/*
--------------------------------------------------
Postituste staatustega seotud endpoindid
--------------------------------------------------
*/

// Kõikide postituste staatuste pärimise endpoint
app.get('/api/v1/posts/statuses', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'List of post statuses',
        postStatuses,
    });
});

// Postituse staatus pärimine staatuse id alusel
app.get('/api/v1/posts/statuses/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const postStatus = postStatuses.find(element => {
        return element.id === id;
    });
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
});

/*
--------------------------------------------------
Postitustega seotud endpoindid
--------------------------------------------------
*/

// Kõikide postituste pärimise endpoint
app.get('/api/v1/posts', (req: Request, res: Response) => {
    const postsWithStatusesAndUsers = posts.map(post => {
        const postWithStatusAndUser = getPostWithStatusAndUser(post);
        return postWithStatusAndUser;
    });
    res.status(200).json({
        success: true,
        message: 'List of posts',
        posts: postsWithStatusesAndUsers,
    });
});

// Postituse pärimine id alusel
app.get('/api/v1/posts/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const post = findPostById(id);
    if (!post) {
        return res.status(404).json({
            success: false,
            message: `Post not found`,
        });
    };

    const postWithStatusAndUser = getPostWithStatusAndUser(post);
    return res.status(200).json({
        success: true,
        message: `Post`,
        data: {
            post: postWithStatusAndUser,
        },
    });
});

// Postituse loomine
app.post('/api/v1/posts', (req: Request, res: Response) => {
    const { title, content, userId, statusId } = req.body;
    if (!title || !content || !userId || !statusId) {
        return res.status(400).json({
            success: false,
            message: `Some data is missing (title, content, userId, statusId)`,
        });
    }
    const id = posts.length + 1;
    const newPost: IPost = {
        id,
        title,
        content,
        userId,
        statusId,
    };
    posts.push(newPost);

    return res.status(201).json({
        success: true,
        message: `Post with id ${newPost.id} created`,
    });
});

// Postituse muutmine
app.patch('/api/v1/posts/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { title, content, statusId } = req.body;
    const post = posts.find(element => {
        return element.id === id;
    });
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

    if (title) post.title = title;
    if (content) post.content = content;
    if (statusId) post.statusId = statusId;

    return res.status(200).json({
        success: true,
        message: `Post updated`,
    });
});

// Postituse kustutamine
app.delete('/api/v1/posts/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Post not found`,
        });
    }
    posts.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `Post deleted`,
    });
});

/*
--------------------------------------------------
Kommentaaridega seotud endpoindid
--------------------------------------------------
*/

// Kõikide kommentaaride pärimise endpoint
app.get('/api/v1/comments', (req: Request, res: Response) => {
    const commentsWithUsers = comments.map(comment => {
        let user: IUser | undefined = usersServices.findUserById(comment.id);
        if (!user) user = usersServices.unknownUser();
        const userWithoutPassword = usersServices.getUserWithoutPassword(user);
        const commentWithUser = {
            id: comment.id,
            content: comment.content,
            user: userWithoutPassword,
        };
        return commentWithUser;
    });

    res.status(200).json({
        success: true,
        message: 'List of all comments',
        comments: commentsWithUsers,
    });
});

// Kommentaari pärimine id alusel
app.get('/api/v1/comments/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const comment = getCommentById(id);
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
});

// Postitusega seotud kommentaaride pärimise endpoint
app.get('/api/v1/posts/:id/comments', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const comments = findCommentsByPostId(id);
    return res.status(200).json({
        success: true,
        message: `Comments of post with id: ${id}`,
        data: {
            comments,
        },
    });
});

// Kommentaari loomine
app.post('/api/v1/comments', (req: Request, res: Response) => {
    const { postId, content } = req.body;
    let { userId } = req.body;
    if (!postId || !content) {
        return res.status(400).json({
            success: false,
            message: `Some data is missing (postId, content)`,
        });
    }
    if (!userId) userId = null;
    const id = comments.length + 1;
    const comment: IComment = {
        id,
        userId,
        postId,
        content,
    };
    comments.push(comment);

    return res.status(201).json({
        success: true,
        message: `comment with id ${comment.id} created`,
    });
});

// Kommentaari kustutamine
app.delete('/api/v1/comments/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Comment not found`,
        });
    }
    comments.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `Comment deleted`,
    });
});

/*
--------------------------------------------------
Postitustega seotud funktsioonid
--------------------------------------------------
*/

const findPostById = (id: number): IPost | undefined => {
    const post = posts.find(element => {
        return element.id === id;
    });
    return post;
};

const getPostWithStatusAndUser = (post: IPost) => {
    const postStatus = getPostStatusById(post.statusId);
    let user: IUser | undefined = usersServices.findUserById(post.userId);
    if (!user) user = usersServices.unknownUser();
    const userWithoutPassword = usersServices.getUserWithoutPassword(user);

    const postWithStatusAndUser = {
        id: post.id,
        title: post.title,
        user: userWithoutPassword,
        status: postStatus,
    };
    return postWithStatusAndUser;
};

const getPostStatusById = (id: number): IPostStatus | undefined => {
    let postStatus: IPostStatus | undefined = postStatuses.find(element => element.id === id);
    if(!postStatus) {
        postStatus = {
            id: 0,
            status: 'Unknown',
        };
    };
    return postStatus;
}
/*
--------------------------------------------------
Kommentaaridega seotud funktsioonid
--------------------------------------------------
*/
const getCommentById = (id: number): IComment | undefined => {
    const comment = comments.find(element => {
        return element.id === id;
    });
    return comment;
};

const findCommentsByPostId = (id: number): IComment[] => {
    const postComments = comments.filter(comment => comment.postId === id);
    return postComments;
}

app.listen(PORT, () => {
    console.log('Server is running');
});
