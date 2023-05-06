import request from "@/utils/request";
import { SearchRes, SongSearch } from "../interfaces";

/**
 * 获取搜索的歌曲
 * @param keywords 
 * @param page 
 * @param limit 
 * @returns 
 */
export const getSearchUser = (keywords: string, page: number, limit: number = 20) => {
    return request.get<SearchRes<SongSearch>>('/cloudsearch', {
        params: {
            keywords,
            type: 1,
            offset: (page - 1) * limit,
            limit
        }
    })
}