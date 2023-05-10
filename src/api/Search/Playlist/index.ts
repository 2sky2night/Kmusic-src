import request from "@/utils/request";
import { SearchRes, PlaylistSearch } from "../interfaces";

/**
 * 获取搜索的歌单
 * @param keywords 
 * @param page 
 * @param limit 
 * @returns 
 */
export const getSearchPlaylist = (keywords: string, page: number, limit: number = 20) => {
    return request.get<SearchRes<PlaylistSearch>>('/cloudsearch', {
        params: {
            keywords,
            type: 1000,
            offset: (page - 1) * limit,
            limit
        }
    })
}