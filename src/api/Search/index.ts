import request from "@/utils/request";
import { SearchHotRes, SuggestRes } from "./interfaces";

/**
 * 获取热搜列表
 * @returns 
 */
export const getSearchHotList = () => request.get<SearchHotRes>('/search/hot/detail')

/**
 * 获取热搜建议
 * @param keywords 
 * @returns 
 */
export const getSearchSuggest = (keywords: string) => {
    return request.get<SuggestRes>('/search/suggest', {
        params: {
            keywords
        }
    })
}