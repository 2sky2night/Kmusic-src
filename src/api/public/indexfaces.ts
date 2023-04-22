

/**
 * 歌单的简略信息
 */
export interface Playlist {
    /**
     * 歌单背景
     */
    backgroundCoverUrl: null;
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
     * 发布时间
     */
    subTime: number;
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
    creator: {
        userId: number;
        userName: string;
    }[];
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
