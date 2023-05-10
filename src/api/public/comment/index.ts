import request from "@/utils/request";
import { CommentType, SendCommentRes } from './interfaces'

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

/**
 * 发送评论
 * @param id - 资源id 
 * @param t - 发送评论的类型
 * @param type 评论资源类型
 * @param content - 评论的内容
 * @returns 
 */
export const sendComment = (id: number, t: 1, type: CommentType, content: string) => {
    return request.get<SendCommentRes>('/comment', {
        params: {
            id,
            t,
            type,
            content
        }
    })
}