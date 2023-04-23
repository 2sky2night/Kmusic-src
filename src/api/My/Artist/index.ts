import request from "@/utils/request"
import { StarArtistRes } from "./interfaces"

/**
 * 收藏的歌手
 * @param page - 第几页
 * @param limit - 获取多少条
 * @returns 
 */
export const getStarArtist = (page: number, limit: number = 24) => {
    return request.get<StarArtistRes>('/artist/sublist', { params: { offset: (page - 1) * limit, limit } })
}
