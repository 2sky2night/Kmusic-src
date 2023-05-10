import request from "@/utils/request";
import { CreatePlaylistRes, DeletePlaylistRes } from "./interfaces";

/**
 * 创建歌单
 * @param name - 歌单的名字 
 * @returns 
 */
export const toCreatePlaylist = (name: string) => {
    return request.get<CreatePlaylistRes>('/playlist/create', {
        params: {
            name
        }
    })
}

/**
 * 删除歌单
 * @param ids  - 歌单列表
 * @returns 
 */
export const toDeletePlaylist = (ids: number[]) => {
    return request.get<DeletePlaylistRes>('/playlist/delete', {
        params: {
            id: ids.join(',')
        }
    })
}