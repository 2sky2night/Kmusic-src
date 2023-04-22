import { Artist } from '@/api/public/indexfaces'

/**
 * 收藏的歌手 /artist/sublist
 */
export interface StarArtistRes {
    code: number;
    count: number;
    data: Artist[];
    hasMore: boolean;
}
