import request from "@/utils/request";
import { CommentRes } from "../public/comment/interfaces";

/**
 * 获取歌单的评论
 * @param id 
 * @param page 
 * @param limit 
 * @returns 
 */
export const getPlaylistCmt = (id: number, page: number, limit: number = 20) => {
    return request.get<CommentRes>('/comment/playlist', {
        params: {
            id,
            offset: (page - 1) * limit,
            limit
        }
    })
}