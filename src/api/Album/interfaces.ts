import { Artist, Song } from "../public/indexfaces";

/**
 * 专辑详情信息的响应体 /album
 */
export interface AlbumInforRes {
    album: AlbumMore;
    code: number;
    resourceState: boolean;
    songs: Song[];
}

/**
 * 专辑的详情信息
 */
export interface AlbumMore {
    alias: string[];
    artist: Artist;
    artists: Artist[];
    awardTags: null;
    blurPicUrl: string;
    briefDesc: string;
    commentThreadId: string;
    company: string;
    companyId: number;
    copyrightId: number;
    /**
     * 专辑简介
     */
    description: string;
    id: number;
    /**
     * 专辑动态信息
     */
    info: AlbumInfo;
    mark: number;
    name: string;
    onSale: boolean;
    paid: boolean;
    pic: number;
    picId: number;
    picId_str: string;
    picUrl: string;
    publishTime: number;
    size: number;
    songs: string[];
    status: number;
    subType: string;
    tags: string;
    type: string;
}


/**
 * 专辑动态信息
 */
export interface AlbumInfo {
    commentCount: number;
    comments: null;
    commentThread: CommentThread;
    latestLikedUsers: null;
    liked: boolean;
    likedCount: number;
    resourceId: number;
    resourceType: number;
    shareCount: number;
    threadId: string;
}

export interface CommentThread {
    commentCount: number;
    hotCount: number;
    id: string;
    latestLikedUsers: null;
    likedCount: number;
    resourceId: number;
    resourceInfo: ResourceInfo;
    resourceOwnerId: number;
    resourceTitle: string;
    resourceType: number;
    shareCount: number;
}

export interface ResourceInfo {
    creator: null;
    encodedId: null;
    id: number;
    imgUrl: string;
    name: string;
    subTitle: null;
    userId: number;
    webUrl: null;
}

/**
 * 收藏/取消收藏专辑/album/sub
 */
export interface SubAlbumRes {
    code: number;
    time: number;
}

