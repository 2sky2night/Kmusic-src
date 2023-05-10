import request from "@/utils/request";
import { SearchRes, UserSearch } from "../interfaces";

/**
 * 获取搜索的用户
 * @param keywords 
 * @param page 
 * @param limit 
 * @returns 
 */
export const getSearchUser = (keywords: string, page: number, limit: number = 20) => {
    return request.get<SearchRes<UserSearch>>('/cloudsearch', {
        params: {
            keywords,
            type: 1002,
            offset: (page - 1) * limit,
            limit
        }
    })
}