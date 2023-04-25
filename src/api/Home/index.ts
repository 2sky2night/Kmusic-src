import { ArtistAreaType } from '../public/indexfaces'
import { BannerRes, AlbumNewRes, RecommendMusic, RecommendArtist, RecommendPlaylist, RecommendRes, RecommendMv } from "./interfaces";
import request from "@/utils/request";

/**
 * 获取轮播图数据 /banner
 * @returns 
 */
export const getBanners = () => request.get<BannerRes>('/banner')

/**
 * 获取推荐的新音乐
 * @param limit - 获取推荐音乐的数量
 * @returns 
 */
export const getRecMusic = (limit:number=12) => {
    return request.get<RecommendRes<RecommendMusic>>('/personalized/newsong', { params: { limit }})
} 

/**
 * 获取推荐的歌单
 * @param limit - 获取推荐歌单的数量
 * @returns 
 */
export const getRecPlayList = (limit: number = 12) => {
    return request.get<RecommendRes<RecommendPlaylist>>('/personalized', { params: { limit } })
} 


/**
 * 获取推荐的mv
 * @param limit - 获取推荐mv的数量
 * @returns 
 */
export const getRecMv= (limit: number = 12) => {
    return request.get<RecommendRes<RecommendMv>>('/personalized/mv', { params: { limit } })
} 

/**
 * 获取推荐的歌手
 * @param area 
 * @param limit 
 * @returns 
 */
export const getRecArtist = (area: ArtistAreaType =-1,limit: number = 12) => {
    return request.get<RecommendArtist>('/artist/list', {
        params: {
            limit,
            area
        }
    })
} 

/**
 * 获取新蝶
 * @returns 
 */
export const getNewAlbum = () => request.get<AlbumNewRes>('/album/newest')