import request from "@/utils/request"
import { StarMvRes } from "./interfaces"


/**
 * 收藏的mv
 * @param page - 第几页?
 * @param limit - 获取多少条
 * @returns 
 */
export const getStarMv = (page: number, limit: number = 24) => {
    return request.get<StarMvRes>('/mv/sublist', { params: { offset: (page - 1) * limit, limit } })
}