interface INewPost {
    userId: number;
    title: string;
    content: string;
    statusId: number;
}

interface IPost extends INewPost {
    id: number;
}

export {INewPost, IPost};