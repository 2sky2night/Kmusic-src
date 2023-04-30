import request from "@/utils/request";
import { CommentRes } from "../public/comment/interfaces";

/**
 * 获取专辑的评论
 * @param id 
 * @param page 
 * @param limit 
 * @returns 
 */
export const getAlbumCmt = (id: number, page: number, limit: number = 20) => {
    return request.get<CommentRes>('/comment/album', {
        params: {
            id,
            offset: (page - 1) * limit,
            limit
        }
    })
}