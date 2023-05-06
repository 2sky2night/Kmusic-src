import request from "@/utils/request";
import { SearchRes, ArtistSearch } from "../interfaces";

/**
 * 获取搜索的专辑
 * @param keywords 
 * @param page 
 * @param limit 
 * @returns 
 */
export const getSearchUser = (keywords: string, page: number, limit: number = 20) => {
    return request.get<SearchRes<ArtistSearch>>('/cloudsearch', {
        params: {
            keywords,
            type: 1004,
            offset: (page - 1) * limit,
            limit
        }
    })
}