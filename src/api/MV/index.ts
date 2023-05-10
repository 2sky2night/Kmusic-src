import type { MVInforRes, MvURLRes, SimiMvRes, SubMvRes, MvType } from './interfaces'
import type { CommentRes } from '../public/comment/interfaces'
import request from '@/utils/request'

/**
 * 获取mv的详情信息
 * @param mvid 
 * @returns 
 */
export const getMvInfor = (mvid: number) => {
    return request.get<MVInforRes>('/mv/detail', {
        params: {
            mvid
        }
    })
}

/**
 * 获取相似mv
 * @param mvid 
 * @returns 
 */
export const getSimiMv = (mvid: number) => {
    return request.get<SimiMvRes>('/simi/mv', {
        params: {
            mvid
        }
    })
}

/**
 * 获取mv的评论
 * @param id 
 * @param page 
 * @param limit 
 * @returns 
 */
export const getMvComment = (id: number, page: number, limit: number = 20) => {
    return request.get<CommentRes>('/comment/mv', {
        params: {
            id,
            offset: (page - 1) * limit,
            limit
        }
    })
}

/**
 * 获取mv的播放路径
 * @param id 
 * @param r 
 * @returns 
 */
export const getMvURL = (id: number, r: MvType) => {
    return request.get<MvURLRes>('/mv/url', {
        params: {
            id, r
        }
    })
}

/**
 * 收藏或取消收藏mv
 * @param mvid 
 * @param t  - 1收藏,0 取消收藏
 * @returns 
 */
export const subMv = (mvid: number, t: 1 | 0) => {
    return request.get<SubMvRes>('/mv/sub', {
        params: {
            mvid, t
        }
    })
}