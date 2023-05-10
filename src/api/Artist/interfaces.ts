import type { Album, Song } from "@/api/public/indexfaces";


/**
 * 获取歌手详情页  /artist/detail
 */
export interface ArtistInforRes {
    code: number;
    data: ArtistData;
    message: string;
}

export interface ArtistData {
    artist: Artist;
    blacklist: boolean;
    preferShow: number;
    /**
     * 歌手的其他身份
     */
    secondaryExpertIdentiy: SecondaryExpertIdentiy[];
    showPriMsg: boolean;
    videoCount: number;
}

export interface Artist {
    albumSize: number;
    alias: string[];
    avatar: string;
    briefDesc: string;
    cover: string;
    id: number;
    identities: string[];
    musicSize: number;
    mvSize: number;
    name: string;
    rank: null;
    transNames: string[];
}

export interface SecondaryExpertIdentiy {
    expertIdentiyCount: number;
    expertIdentiyId: number;
    expertIdentiyName: string;
}

/**
 * 获取歌手专辑的响应体 /artist/album
 */
export interface ArtistAlbumRes {
    code: number;
    hotAlbums: Album[];
    more: boolean;
}

/**
 *  获取歌手mv的响应体 /artist/mv
 */
export interface ArtistMvRes {
    code: number;
    hasMore: boolean;
    mvs: MvData[];
    time: number;
}


export interface MvData {
    artist: {
        albumSize: number;
        alias: string[];
        briefDesc: string;
        id: number;
        img1v1Id: number;
        img1v1Id_str: string;
        img1v1Url: string;
        musicSize: number;
        name: string;
        picId: number;
        picUrl: string;
        topicPerson: number;
        trans: string;
    }
    ;
    artistName: string;
    duration: number;
    id: number;
    imgurl: string;
    imgurl16v9: string;
    name: string;
    playCount: number;
    publishTime: string;
    status: number;
    subed: boolean;
}


/**
 * 歌手的详情信息和热门歌曲的响应体 /artists
 */
export interface ArtistHotSongRes {
    artist: {
        albumSize: number;
        alias: string[];
        briefDesc: string;
        followed: boolean;
        id: number;
        img1v1Id: number;
        img1v1Id_str: string;
        img1v1Url: string;
        musicSize: number;
        mvSize: number;
        name: string;
        picId: number;
        picId_str: string;
        picUrl: string;
        publishTime: number;
        topicPerson: number;
        trans: string;
};
    code: number;
    hotSongs: Song[];
}
