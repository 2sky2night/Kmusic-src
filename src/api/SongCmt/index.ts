import request from "@/utils/request"
import { CommentRes } from "../public/comment/interfaces"

/**
 * 获取歌曲评论
 * @param id - 歌曲id
 * @param page 第几页获取数据
 * @param limit 获取几条数据
 * @returns 
 */
export const getSongComment = (id: number, page: number, limit: number = 20) => {
    return request.get<CommentRes>('/comment/music', { params: { id, offset: (page - 1) * limit, limit } })
}