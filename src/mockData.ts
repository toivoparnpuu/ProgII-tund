import { IComment } from "./components/comments/interfaces";
import { IPost } from "./components/posts/interfaces";
import { IPostStatus } from "./components/postsStatuses/interfaces";
import { IUser } from "./components/users/interfaces";

const users: IUser[] = [
    {
        id: 1,
        firstName: 'Juhan',
        lastName: 'Juurikas',
        email: 'juhan@juurikas.ee',
        password: 'juhan',
    },
];

const posts: IPost[] = [
    {
        id: 1,
        title: 'Esimene postitus',
        content: 'Esimese postituse sisu',
        userId: 2,
        statusId: 7,
    },
    {
        id: 2,
        title: 'Teine postitus',
        content: 'Teise postituse sisu',
        userId: 1,
        statusId: 2,
    },
];

const postStatuses: IPostStatus[] = [
    {
        id: 1,
        status: 'Draft',
    },
    {
        id: 2,
        status: 'Public',
    },
    {
        id: 3,
        status: 'Private',
    },
];

const comments: IComment[] = [
    {
        id: 1,
        userId: 1,
        postId: 1,
        content: 'Esimese postituse esimene kommentaar', 
    },
    {
        id: 2,
        userId: 1,
        postId: 2,
        content: 'Teise postituse esimene kommentaar', 
    },
    {
        id: 3,
        userId: 1,
        postId: 2,
        content: 'Teise postituse teine kommentaar', 
    },
];

export { users, posts, postStatuses, comments };
