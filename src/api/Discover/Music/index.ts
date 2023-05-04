import request from "@/utils/request";
import { RecommendRes } from "@/api/Home/interfaces";
import { RecommendMusic } from "@/api/Home/interfaces";

/**
 * 获取推荐的新歌曲
 * @returns 
 */
export const getRecSongs = () => {
    return request.get<RecommendRes<RecommendMusic>>('/personalized/newsong', {
        params: {
            limit: 1000
        }
    })
}