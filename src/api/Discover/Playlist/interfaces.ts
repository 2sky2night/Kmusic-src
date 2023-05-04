import { Playlist } from "@/api/public/indexfaces";
/**
 * 获取歌单分类的响应体  /playlist/catlist
 */
export interface PlaylistCategoriesRes {
    /**
       * 全部歌单
       */
    all: Tag;
    /**
     * 歌单分类 一级分类
     */
    categories: Categories;
    code: number;
    /**
     * 二级分类
     */
    sub: Tag[];
}

/**
 * 歌单分类 一级分类
 */
export interface Categories {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
    "4": string;
}

/**
 * 二级分类
 */
export interface Tag {
    activity: boolean;
    /**
     * 分类所属
     */
    category: number;
    hot: boolean;
    imgId: number;
    imgUrl: null;
    name: string;
    resourceCount: number;
    resourceType: number;
    type: number;
}

/**
 * 获取发现的歌单响应体  /top/playlist
 */
export interface DiscoverPlaylistRes {
    cat: string;
    code: number;
    more: boolean;
    playlists: Playlist[];
    total: number;
}