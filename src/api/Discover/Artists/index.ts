import { RecommendArtist } from "@/api/Home/interfaces"
import { ArtistAreaType, ArtistType } from "@/api/public/indexfaces"
import request from "@/utils/request"



/**
 * 发现歌手
 * @param area - 地区类别 歌手地区类别 -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
 * @param type - 歌手类别 -1:全部 1:男歌手 2:女歌手 3:乐队
 * @param offset - 从第几条数据开始获取数据
 * @param initial - 索引依据 -1为热门排序,若为字符串则以歌手拼音排序
 * @param limit - 每次响应多少条数据
 * @returns 
 */
export const getRecArtist = (area: ArtistAreaType = -1, type: ArtistType, offset: number, initial: -1 | string, limit: number = 24) => {
    return request.get<RecommendArtist>('/artist/list', {
        params: {
            limit,
            area,
            offset,
            initial,
            type
        }
    })
} 