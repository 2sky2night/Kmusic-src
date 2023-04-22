import request from "@/utils/request";
import { StarAlbumRes } from "./inferfaces";


/**
 * 收藏的专辑
 * @param page - 第几页数据
 * @param limit - 获取多少条
 * @returns 
 */
export const getStarAlbum = (page: number, limit: number = 20) => {
    return request.get<StarAlbumRes>('/album/sublist', { params: { offset: (page - 1) * limit, limit } })
}