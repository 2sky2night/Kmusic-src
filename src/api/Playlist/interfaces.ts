import { Song, Privilege, User } from "../public/indexfaces";

/**
 * 歌单的详情信息的响应体/playlist/detail
 */
export interface PlaylistDetialRes {
    code: number;
    fromUserCount: number;
    playlist: PlaylistInfor;
    privileges: Privilege[];
}

/**
 * 歌单详情信息
 */
export interface PlaylistInfor {
    /**
     * 歌单评论数量
     */
    commentCount: number;
    /**
     *歌单封面的url
     */
    coverImgUrl: string;
    /**
     * 歌单创建时间
     */
    createTime: number;
    /**
     * 歌单创建者
     */
    creator: User;
    /**
     * 歌单描述
     */
    description: string;
    /**
     * 歌单的id
     */
    id: number;
    /**
     * 歌单的名称
     */
    name: string;
    ordered: boolean;
    /**
     * 播放次数
     */
    playCount: number;
    /**
     * 分享次数
     */
    shareCount: number;
    /**
     * 我关注了吗
     */
    subscribed: boolean;
    subscribedCount: number;
    /**
     * 歌单的关注者 8条
     */
    subscribers: User[];
    /**
     * 歌单标签
     */
    tags: string[];
    /**
     * 更新时间
     */
    updateTime: number;
    /**
     * 歌单创建者的id
     */
    userId: number;
    /**
     * 歌曲
     */
    tracks: Song[];
    /**
     * 一共多少首歌曲
     */
    trackCount: number,
}

/**
 * 歌单当前动态信息的响应体 /playlist/detail/dynamic
 */
export interface PlaylistDynamicRes {
    bookedCount: number;
    code: number;
    commentCount: number;
    followed: boolean;
    gradeStatus: string;
    playCount: number;
    remarkName: null;
    remixVideo: null;
    shareCount: number;
    subscribed: boolean;
}

/**
 * 歌单某一页的歌曲 /playlist/track/all
 */

export interface PlaylistSongList {
    code: number;
    privileges: Privilege[];
    songs: Song[];
}


