import { Song,Privilege, Playlist, Album, Artist } from "../public/indexfaces";

/**
 * 歌曲详情页数据 /song/detail
 */
export interface SongInforRes {
    code: number;
    privileges: Privilege[];
    songs: Song[];
}

/**
 * 包含这首歌的歌单 /simi/playlist
 */
export interface SimiPlayListRes {
    code: number;
    playlists: Playlist[];
}

/**
 * 相似歌曲 /simi/song
 */
export interface SimiSongRes {
    code: number;
    songs: SongMore[];
}

/**
 * 歌曲信息 (字段不一样而已)
 */
export interface SongMore {
    album: Album;
    alg: string;
    alias: string[];
    artists: Artist[];
    audition: null;
    commentThreadId: string;
    copyFrom: string;
    copyrightId: number;
    crbt: null;
    dayPlays: number;
    disc: string;
    duration: number;
    fee: number;
    ftype: number;
    hearTime: number;
    hrMusic: null;
    id: number;
    mark: number;
    mp3Url: string;
    mvid: number;
    name: string;
    no: number;
    noCopyrightRcmd: null;
    originCoverType: number;
    originSongSimpleData: null;
    playedNum: number;
    popularity: number;
    position: number;
    privilege: Privilege;
    recommendReason: string;
    ringtone: string;
    rtUrl: null;
    rtUrls: null;
    rtype: number;
    rurl: null;
    score: number;
    songJumpInfo: null;
    starred: boolean;
    starredNum: number;
    status: number;
}

