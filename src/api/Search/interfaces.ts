import type { Artist, Album, Song, Playlist } from "../public/indexfaces";
import type { UserFollow } from "../public/user/interfaces";
/**
 * 获取搜索热词 /search/hot/detail
 */
export interface SearchHotRes {
    code: number;
    data: HotItem[];
    message: string;
}

/**
 *  搜索热词的每一项 
 */
export interface HotItem {
    alg: string;
    /**
     * 描述
     */
    content: string;
    /**
     * 是否显示图标
     */
    iconType: number;
    /**
     * 图标地址
     */
    iconUrl: null | string;
    /**
     * 搜索热度
     */
    score: number;
    /**
     * 搜索的热词
     */
    searchWord: string;
    source: number;
    url: string;
}


/**
 * 获取搜索联想词 /search/suggest
 */
export interface SuggestRes {
    code: number;
    result: {
        albums: SuggestItem[];
        artists: SuggestItem[];
        /**
         * 排序依据
         */
        order: SuggestType[];
        playlists: SuggestItem[];
        songs: SuggestItem[];
    };
}

/**
 * 搜索建议的每一项
 */
export interface SuggestItem {
    id: number;
    name: string;
}

export type SuggestType  = 'albums' | 'artists' | 'songs' | 'playlists'

// /**
//  * 联想词搜索出来的专辑
//  */
// export interface SuggestAlbum {
//     artist: Artist;
//     copyrightId: number;
//     id: number;
//     mark: number;
//     name: string;
//     picId: number;
//     publishTime: number;
//     size: number;
//     status: number;
// }

// /**
//  * 联想词搜索出来的歌手
//  */
// export interface SuggestArtist {
//     accountId: number;
//     albumSize: number;
//     alias: string[];
//     fansGroup: null;
//     id: number;
//     img1v1: number;
//     img1v1Url: string;
//     name: string;
//     picId: number;
//     picUrl: string;
//     trans: string;
//     transNames: string[];
// }

// /**
//  * 联想词搜索出来的歌单
//  */
// export interface SuggestPlaylist {
//     action: null;
//     actionType: null;
//     bookCount: number;
//     coverImgUrl: string;
//     creator: null;
//     description: string;
//     highQuality: boolean;
//     id: number;
//     name: string;
//     officialTags: null;
//     playCount: number;
//     recommendText: null;
//     score: null;
//     specialType: number;
//     subscribed: boolean;
//     trackCount: number;
//     userId: number;
// }

// /**
//  * 联想词搜索出来的歌曲
//  */
// export interface SuggestSong {
//     album: SuggestAlbum;
//     alias: string[];
//     artists: SuggestArtist[];
//     copyrightId: number;
//     duration: number;
//     fee: number;
//     ftype: number;
//     id: number;
//     mark: number;
//     mvid: number;
//     name: string;
//     rtype: number;
//     rUrl: null;
//     status: number;
// }

/**
 * 搜索的响应体 /cloudsearch
 */
export interface SearchRes<T> {
    code: number;
    result: T;
}

/**
 * 搜索专辑的响应内容
 */
export interface AlbumSearch {
    albumCount: number;
    albums: Album[];
}

/**
 * 搜索用户的响应内容
 */
export interface UserSearch {
    userprofileCount: number;
    userprofiles: UserFollow[];
}

/**
 * 搜索歌曲的响应内容
 */
export interface SongSearch {
    searchQcReminder: null;
    songCount: number;
    songs: Song[];
}

/**
 * 搜索歌手的响应内容
 */
export interface ArtistSearch {
    artistCount: number;
    artists: Artist[];
}

/**
 * 获取歌单的响应内容
 */
export interface PlaylistSearch {
    playlistCount: number;
    playlists: Playlist[];
    searchQcReminder: null;
}

/**
 * 获取mv的响应内容 
 */
export interface MvSearch {
    mvCount: number;
    mvs: SearchMvItem[];
}

/**
 * 搜索的每一项mv
 */
export interface SearchMvItem {
    alias: string[] | null;
    artistId: number;
    artistName: string;
    artists: {
        alias: string[];
        id: number;
        name: string;
        transNames: string[];
    }[];
    briefDesc: null | string;
    cover: string;
    desc: null;
    duration: number;
    id: number;
    mark: number;
    name: string;
    playCount: number;
    transNames: string[] | null;
}