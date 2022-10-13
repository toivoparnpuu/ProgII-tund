import { posts } from "../../mockData";
import postStatusesService from "../postsStatuses/services";
import { IUser } from "../users/interfaces";
import usersServices from "../users/services";
import { INewPost, IPost, IPostToUpdate } from "./interfaces";

const postsService = {
    getAllPosts: () => {
        const postsWithStatusesAndUsers = posts.map(post => {
            const postWithStatusAndUser = postsService.getPostWithStatusAndUser(post);
            return postWithStatusAndUser;
        });
        return postsWithStatusesAndUsers;
    },
    getPostById: (id: number): IPost | undefined => {
        const post = posts.find(element => {
            return element.id === id;
        });
        return post;
    },
    createPost: (newPost: INewPost): number => {
        const id = posts.length + 1;
        const post: IPost = {
            id,
            ...newPost,
        };
        posts.push(post);
        return id;
    },
    updatePost: (postToUpdate: IPostToUpdate) => {
        const { id, title, content, statusId } = postToUpdate;
        const post = postsService.getPostById(id);
        if (post && title) post.title = title;
        if (post && content) post.content = content;
        if (post && statusId) post.statusId = statusId;
        return true;
    },
    deletePost: (id: number): Boolean => {
        const index = posts.findIndex(element => element.id === id);
        if (index === -1) return false;
        posts.splice(index, 1);
        return true;
    },
    getPostWithStatusAndUser: (post: IPost) => {
        const postStatus = postStatusesService.getPostStatusById(post.statusId);
        let user: IUser | undefined = usersServices.findUserById(post.userId);
        if (!user) user = usersServices.unknownUser();
        const userWithoutPassword = usersServices.getUserWithoutPassword(user);
    
        const postWithStatusAndUser = {
            id: post.id,
            title: post.title,
            content: post.content,
            user: userWithoutPassword,
            status: postStatus,
        };
        return postWithStatusAndUser;
    },
};

export default postsService;
