import request from "@/utils/request";
import type { ArtistAlbumRes, ArtistHotSongRes, ArtistInforRes, ArtistMvRes } from "./interfaces";

/**
 * 获取歌手详情信息
 * @param id 
 * @returns 
 */
export const getArtistInfor = (id: number) => request.get<ArtistInforRes>('/artist/detail', {
    params: {
        id
    }
})


/**
 * 收藏/取消收藏歌手 接口问题目前只能取消收藏歌手
 * @param id 
 * @param t 
 * @returns 
 */
export const subArtist = (id: number, t: 0 | 1) => {
    return request.get<{ code: number; }>('/artist/sub', {
        params: {
            id,
            t
        }
    })
}


/**
 * 获取歌手的专辑
 * @param id  - 歌手id
 * @param page - 加载第几页数据
 * @param limit - 每次获取多少条数据
 * @returns 
 */
export const getArtistAlbum = (id: number, page: number, limit: 20) => {
    return request.get<ArtistAlbumRes>('/artist/album', {
        params: {
            id,
            limit,
            offset: (page - 1) * limit
        }
    })
}


/**
 * 获取歌手的mv列表
 * @param id - 歌手id
 * @param page  - 加载第几页数据
 * @param limit - 每一页多少条数据
 * @returns 
 */
export const getArtistMv = (id: number, page: number, limit: 20) => {
    return request.get<ArtistMvRes>('/artist/mv', {
        params: {
            id,
            limit,
            offset: (page - 1) * limit
        }
    })
}


/**
 * 获取歌手热门歌曲
 * @param id - 歌手id
 * @returns 
 */
export const getArtistHotSong = (id: number) => {
    return request.get<ArtistHotSongRes>('/artists', {
        params: {
            id
        }
    })
}