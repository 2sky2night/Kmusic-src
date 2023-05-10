import request from "@/utils/request";
import { DiscoverPlaylistRes, PlaylistCategoriesRes } from "./interfaces";

/**
 * 获取歌单分类
 */
export const getPlaylistCategory = () => request.get<PlaylistCategoriesRes>('/playlist/catlist')


/**
 * 获取对应分类下的歌单
 * @param cat 
 * @param page 
 * @param limit 
 * @returns 
 */
export const getPlaylistByTag = (cat: string, page: number, limit: number = 20) => {
    return request.get<DiscoverPlaylistRes>('/top/playlist', {
        params: {
            cat,
            limit,
            offset: (page - 1) * limit
        }
    })
}