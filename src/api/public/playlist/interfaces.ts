import type { Playlist } from "../indexfaces";



/**
 * 创建歌单的响应体
 */
export interface CreatePlaylistRes {
    code: number;
    id: number;
    playlist: Playlist;
}

/**
 * 删除歌单的响应体
 */
export interface DeletePlaylistRes {
    code: number;
    data: null;
    message: null;
    msg: null;
}