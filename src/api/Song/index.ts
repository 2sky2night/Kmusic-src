import type { SimiSongRes, SongInforRes, SimiPlayListRes } from "./interfaces";
import request from "@/utils/request";

/**
 * 获取歌曲详情信息
 * @param  ids - 歌曲id
 * @returns 
 */
export const getSongInfor = (ids: number) => {
    return request.get<SongInforRes>('/song/detail', { params: { ids } })
}

/**
 * 获取相似的歌曲
 * @param id 
 * @returns 
 */
export const getSimiSongs = (id: number) => {
    return request.get<SimiSongRes>('/simi/song', { params: { id } })
}


/**
 * 获取包含这首歌的歌单 (数量不会特别大)
 * @param id 
 * @returns 
 */
export const getSimiPlaylist = (id: number) => {
    return request.get<SimiPlayListRes>('/simi/playlist', { params: { id } })
}
