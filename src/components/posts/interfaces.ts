interface INewPost {
    userId: number;
    title: string;
    content: string;
    statusId: number;
}

interface IPost extends INewPost {
    id: number;
}

interface IPostToUpdate {
    id: number;
    title?: string;
    content?: string;
    statusId?: number;
}

export { INewPost, IPost, IPostToUpdate };