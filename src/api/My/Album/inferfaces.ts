import { Album, Artist, MV } from '@/api/public/indexfaces'
/**
 * 收藏的专辑/album/sublist
 */
export interface StarAlbumRes {
    code: number;
    /**
     * 收藏的专辑总数
     */
    count: number;
    /**
     * 收藏的专辑列表
     */
    data: Album[];
    /**
     * 还有更多吗?
     */
    hasMore: boolean;
    paidCount: number;
}

/**
 * 收藏的歌手 /artist/sublist
 */
export interface StarArtistRes {
    code: number;
    count: number;
    data: Artist[];
    hasMore: boolean;
}

/**
 * 收藏的mv /mv/sublist
 */
export interface StarMvRes {
    code: number;
    data: MV[];
    hasMore: boolean;
}
