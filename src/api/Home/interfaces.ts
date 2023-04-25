import { Song, Artist, Album } from "../public/indexfaces";
/**
 * 轮播图的响应体 /banners
 */
export interface BannerRes {
    banners: Banner[];
    code: number;
}

/**
 * 推荐的响应内容
 */
export interface RecommendRes<T> {
    category: number;
    code: number;
    result: T[];
}


/**
 * 推荐歌单的基本信息 /personalized
 */
export interface RecommendPlaylist {
    id: number;
    name: string;
    picUrl: string;
    playCount: number;
    trackCount: number;
    trackNumberUpdateTime: number;
    type: number;
}

/**
 * 推荐的新音乐 /personalized/newsong
 */
export interface RecommendMusic {
    /**
     * 歌曲id
     */
    id: number;
    /**
     * 歌曲名称
     */
    name: string;
    /**
     * 歌曲图片地址
     */
    picUrl: string;
    /**
     * 歌曲信息
     */
    song: Song;
    /**
     * 歌曲类型
     */
    type: number;
}

/**
 * 推荐的mv /personalized/mv
 */
export interface RecommendMv {
    artistId: number;
    artistName: string;
    artists: MvArtist[];
    /**
     * mv的描述
     */
    copywriter: string;
    /**
     * mv的持续时间
     */
    duration: number;
    /**
     * mv的id
     */
    id: number;
    /**
     * mv的标题
     */
    name: string;
    /**
     * mv的封面
     */
    picUrl: string;
    playCount: number;
}

/**
 * 推荐歌手的响应体 /artist/list
 */
export interface RecommendArtist {
    artists: Artist[];
    code: number;
    more: boolean;
}

/**
 * 新蝶上架的响应体  /album/newest
 */
export interface AlbumNewRes {
    albums: Album[];
    code: number;
}


/**
 * mv的创作者
 */
export interface MvArtist {
    id: number;
    name: string;
}

/**
 * 轮播图的数据结构
 */
export interface Banner {
    bannerBizType: string;
    encodeId: string;
    exclusive: boolean;
    /**
     * 轮播图的图像url
     */
    imageUrl: string;
    scm: string;
    /**
     * 轮播图id
     */
    targetId: number;
    /**
     * 跳转类型,1是跳转到歌曲,1000是跳转到歌单里面去
     */
    targetType: number;
    /**
     * 标题颜色
     */
    titleColor: string;
    /**
     * 轮播图标题
     */
    typeTitle: string;
}
