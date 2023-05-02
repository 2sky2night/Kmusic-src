/**
 * mv详情的响应体  /mv/detail
 */
export interface MVInforRes {
    bufferPic: string;
    bufferPicFS: string;
    code: number;
    data: MvData;
    loadingPic: string;
    loadingPicFS: string;
    mp: Mp;
    /**
     * 是否收藏该mv
     */
    subed: boolean;
}

export interface MvData {
    /**
     * 歌手id
     */
    artistId: number;
    /**
     * 歌手名称
     */
    artistName: string;
    /**
     * 全部歌手
     */
    artists: MvArtist[];
    /**
     * mv的分辨率
     */
    brs: Br[];
    commentCount: number;
    commentThreadId: string;
    /**
     * mv视频的封面
     */
    cover: string;
    coverId: number;
    coverId_str: string;
    /**
     * mv视频简介
     */
    desc: string;
    /**
     * 时长
     */
    duration: number;
    /**
     * mv的id
     */
    id: number;
    /**
     * mv的名称
     */
    name: string;
    nType: number;
    /**
     * 播放次数
     */
    playCount: number;
    /**
     * 发布时间
     */
    publishTime: string;
    /**
     * 分享次数
     */
    shareCount: number;
    /**
     * 收藏次数
     */
    subCount: number;
    videoGroup: string[];
}

/**
 * mv的歌手信息
 */
export interface MvArtist {
    followed: boolean;
    id: number;
    img1v1Url: string;
    name: string;
}

/**
 * mv视频的分辨率
 */
export interface Br {
    br: MvType;
    point: number;
    size: number;
}

/**
 * 什么东西???
 */
export interface Mp {
    cp: number;
    dl: number;
    fee: number;
    id: number;
    msg: null;
    mvFee: number;
    normal: boolean;
    payed: number;
    pl: number;
    sid: number;
    st: number;
    unauthorized: boolean;
}


/**
 * 相似的mv 的响应体 /simi/mv
 */
export interface SimiMvRes {
    code: number;
    mvs: MvSort[];
}

/**
 * mv的简略信息
 */
export interface MvSort {
    alg: string;
    artistId: number;
    artistName: string;
    artists: {
        alias: string[];
        id: number;
        name: string;
        transNames: string;
    }[];
    briefDesc: null | string;
    cover: string;
    desc: null;
    duration: number;
    id: number;
    mark: number;
    name: string;
    playCount: number;
    /**
     * 翻译名称
     */
    transNames: string[];
}


/**
 * 获取mv的播放路径的响应体  /mv/url
 */
export interface MvURLRes {
    code: number;
    data: MvURLData
}

export interface MvURLData {
    code: number;
    expi: number;
    fee: number;
    id: number;
    md5: string;
    msg: string;
    mvFee: number;
    promotionVo: null;
    r: number;
    size: number;
    st: number;
    url: string;
}

/**
 * 收藏mv的响应体 /mv/sub
 */
export interface SubMvRes {
    code: number;
    data: null;
    message: string;
}

/**
 * mv的分辨率
 * mv的分辨率 240、480、720、1080
 */
export type MvType = 240 | 480 | 720 | 1080