import request from "@/utils/request";
import { PlaylistDetialRes, PlaylistDynamicRes, PlaylistSongList } from './interfaces'


/**
 * 收藏或取消收藏歌单
 * @param t - 1为收藏 0 为取消收藏
 * @param id - 歌单id
 * @returns 
 */
export const toggleSubPlaylist = (t: 1 | 0, id: number) => {
    return request.get<{ code: number }>('/playlist/subscribe', { params: { t, id } })
}

/**
 * 获取歌单详情信息
 * @param id - 歌单id
 * @returns 
 */
export const getPlaylistInfor = (id: number) => {
    return request.get<PlaylistDetialRes>('/playlist/detail', { params: { id } })
}

/**
 * 获取歌单动态信息
 * @param id - 歌单id
 * @returns 
 */
export const getPlaylistDynamic = (id: number) => {
    return request.get<PlaylistDynamicRes>('/playlist/detail/dynamic', { params: { id } })
}

/**
 * 获取歌单某一页的数据
 * @param id - 歌单的id
 * @param page  - 第几页
 * @param limit  - 每次获取多少条数据
 * @returns 
 */
export const getPlaylistSong = (id: number, page: number, limit: number = 20) => {
    return request.get<PlaylistSongList>('/playlist/track/all', {
        params: {
            id,
            offset: (page - 1) * limit,
            limit
        }
    })
}
