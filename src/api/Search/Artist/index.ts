import request from "@/utils/request";
import { SearchRes, ArtistSearch } from "../interfaces";

/**
 * 获取搜索的歌手
 * @param keywords 
 * @param page 
 * @param limit 
 * @returns 
 */
export const getSearchArtist = (keywords: string, page: number, limit: number = 20) => {
    return request.get<SearchRes<ArtistSearch>>('/cloudsearch', {
        params: {
            keywords,
            type: 100,
            offset: (page - 1) * limit,
            limit
        }
    })
}