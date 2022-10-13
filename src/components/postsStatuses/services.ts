import { postStatuses } from "../../mockData";
import { IPostStatus } from "./interfaces";

const postStatusesService = {
    getAllPostStatuses: (): IPostStatus[] => {
        return postStatuses;
    },
    getPostStatusById: (id: number): IPostStatus | undefined => {
        let postStatus: IPostStatus | undefined = postStatuses.find(element => element.id === id);
        if(!postStatus) {
            postStatus = {
                id: 0,
                status: 'Unknown',
            };
        };
        return postStatus;
    },
};

export default postStatusesService;
