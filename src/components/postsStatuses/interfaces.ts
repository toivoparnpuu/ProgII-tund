interface INewPostStatus {
    status: string;
}

interface IPostStatus extends INewPostStatus {
    id: number;
}

export { INewPostStatus, IPostStatus };
