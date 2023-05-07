import request from "@/utils/request";
import { SearchRes, MvSearch } from "../interfaces";

/**
 * 获取搜索的Mv
 * @param keywords 
 * @param page 
 * @param limit 
 * @returns 
 */
export const getSearchMv = (keywords: string, page: number, limit: number = 20) => {
    return request.get<SearchRes<MvSearch>>('/cloudsearch', {
        params: {
            keywords,
            type: 1004,
            offset: (page - 1) * limit,
            limit
        }
    })
}