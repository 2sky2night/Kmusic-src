import { AlbumInforRes, SubAlbumRes } from "./interfaces";
import request from "@/utils/request";


/**
 * 获取专辑详情信息
 * @param id - 专辑id
 * @returns 
 */
export const getAlbumInfor = (id: number) => {
    return request.get<AlbumInforRes>('/album', { params: { id } })
}

/**
 * 取消/收藏专辑
 * @param id - 专辑id
 * @param t - 0取消收藏 1收藏
 * @returns 
 */
export const toggleSubAlbum = (id: number, t: 0 | 1) => {
    return request.get<SubAlbumRes>('/album/sub', { params: { id, t } })
}