import request from "@/utils/request";
import { CommentType } from './interfaces'

/**
 * 
 * @param id - 资源id
 * @param cid - 评论的id
 * @param t - 点赞类型
 * @param type - 资源类型
 * @returns 
 */
export const toLikeComment = (id: number, cid: number, t: 0 | 1, type: CommentType) => {
    return request.get<{ code: number }>('/comment/like', {
        params: {
            id,
            cid,
            t,
            type
        }
    })
}