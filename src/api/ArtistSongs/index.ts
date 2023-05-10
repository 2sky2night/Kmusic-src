import request from "@/utils/request";
import { ArtistSongsRes,SongsRes } from "./interfaces";


/**
 * 获取歌手全部歌曲
 * @param id - 歌手的id
 * @param page - 浏览第几页
 * @param order - 排序依据
 * @param limit - 每页多少条
 * @returns 
 */
export const getArtistSongs = (id: number, page: number, order: 'hot' | 'time', limit: number = 20) => {
    return request.get<ArtistSongsRes>('/artist/songs', {
        params: {
            id,
            order,
            limit,
            offset: (page - 1) * limit
        }
    })
}

/**
 * 获取一些歌曲信息
 * @param ids - 一些歌曲id数组
 * @returns 
 */
export const getSongs = (ids: number[]) => {
    return request.get<SongsRes>('/song/detail', {
        params: {
            ids:ids.join(',')
        }
    })
}