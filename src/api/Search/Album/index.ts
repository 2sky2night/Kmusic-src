import request from "@/utils/request";
import { SearchRes, AlbumSearch } from "../interfaces";

/**
 * 获取搜索的专辑
 * @param keywords 
 * @param page 
 * @param limit 
 * @returns 
 */
export const getSearchAlbum = (keywords: string, page: number, limit: number = 20) => {
    return request.get<SearchRes<AlbumSearch>>('/cloudsearch', {
        params: {
            keywords,
            type: 10,
            offset: (page - 1) * limit,
            limit
        }
    })
}