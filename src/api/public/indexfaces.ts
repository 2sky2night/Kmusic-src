

/**
 * 歌单的简略信息
 */
export interface Playlist {
    /**
     * 歌单封面
     */
    coverImgUrl: string;
    /**
     * 创建时间
     */
    createTime: number;
    creator: PlaylistCreator;
    /**
     * 歌单的描述
     */
    description: null | string;
    id: number;
    name: string;
    /**
     * 播放量
     */
    playCount: number;
    privacy: number;
    /**
     * 收藏了吗
     */
    subscribed: boolean;
    /**
     * 收藏人数
     */
    subscribedCount: number;
    /**
     * 收藏的人
     */
    subscribers: string[];
    /**
     * 歌单标签
     */
    tags: string[];
    userId: number;
}

/**
 * 歌单创建者
 */
export interface PlaylistCreator {
    avatarUrl: string;
    description: string;
    detailDescription: string;
    followed: boolean;
    gender: number;
    mutual: boolean;
    nickname: string;
    province: number;
    remarkName: null;
    signature: string;
    userId: number;
    userType: number;
    vipType: number;
}


/**
 * 专辑的简略信息
 */
export interface Album {
    alias: string[];
    /**
     * 专辑的歌手们
     */
    artists: Artist[];
    /**
     * 专辑id
     */
    id: number;
    /**
     * 专辑名称
     */
    name: string;
    picId: number;
    /**
     * 封面url
     */
    picUrl: string;
    size: number;
    /**
     * 关注时间
     */
    subTime?: number;
    /**
     * 发布时间
     */
    publishTime?: number;
}

/**
 * 歌手的简略信息
 */
export interface Artist {
    /**
     * 歌手别名
     */
    alias: string[];
    briefDesc: string;
    /**
     * 关注了吗?
     */
    followed: boolean;
    /**
     * 歌手id
     */
    id: number;
    img1v1Id: number;
    img1v1Id_str: string;
    /**
     * 专辑数量
     */
    albumSize: number;
    img1v1Url: string;
    /**
     * mv数量
     */
    mvSize: number;
    /**
     * 歌手名称
     */
    name: string;
    picId: number;
    /**
     * 歌手图片
     */
    picUrl: string;
    musicSize?: number
}


/**
 * mv的简略信息
 */
export interface MV {
    aliaName: string;
    /**
     * mv的封面
     */
    coverUrl: string;
    /**
     * mv的创建者
     */
    creator: Createor[];
    /**
     * mv的持续时间
     */
    durationms: number;
    /**
     * 播放次数
     */
    playTime: number;
    /**
     * mv的名称
     */
    title: string;
    /**
     * mv的id
     */
    vid: string;
}

/**
 * 创作者的基本信息
 */
export interface Createor {
    userId: number;
    userName: string;
}


/**
 * 用户的基本信息
 */
export interface User {
    accountStatus: number;
    authority: number;
    authStatus: number;
    avatarImgId: number;
    avatarImgIdStr: string;
    avatarUrl: string;
    backgroundImgId: number;
    backgroundImgIdStr: string;
    backgroundUrl: string;
    birthday: number;
    city: number;
    defaultAvatar: boolean;
    description: string;
    detailDescription: string;
    djStatus: number;
    experts: null;
    expertTags: null;
    followed: boolean;
    gender: number;
    mutual: boolean;
    nickname: string;
    province: number;
    remarkName: null;
    /**
     * 用户签名
     */
    signature: string;
    userId: number;
    userType: number;
    vipType: number;
}

/**
 * 歌曲信息简略信息
 */
export interface Song {
    album: Album;
    alias: string[];
    artists: Artist[];
    /**
     * 日播放量
     */
    dayPlays: number;
    /**
     * 排序顺序
     */
    disc: string;
    /**
     * 持续时间
     */
    duration: number;
    fee: number;
    ftype: number;
    hearTime: number;
    /**
     * 歌曲id
     */
    id: number;
    /**
     * mp3的播放url路径
     */
    mp3Url: null;
    /**
     * mv的id
     */
    mvid: number;
    /**
     * 歌曲名称
     */
    name: string;
    playedNum: number;
    score: number;
}

/**
 * 歌手类别
 * -1:全部
1:男歌手
2:女歌手
3:乐队
 */
export type ArtistType = -1 | 1 | 2 | 3

/**
 * 歌手地区类别
 * -1:全部
7华语
96欧美
8:日本
16韩国
0:其他
 */
export type ArtistAreaType = -1 | 7 | 96 | 8 | 16 | 0