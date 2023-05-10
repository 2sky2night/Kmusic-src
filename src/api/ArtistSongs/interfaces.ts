import { Song,Privilege } from "../public/indexfaces";

/**
 * 获取歌手的全部歌曲 /artist/songs
 */
export interface ArtistSongsRes {
    code: number;
    more: boolean;
    songs: Song[];
    total: number;
}


/**
 * 获取一些歌曲的信息
 */
export interface SongsRes {
    code: number;
    songs: Song[];
    privileges: Privilege[];
}
