import request from "@/utils/request";
import { RemoveSongToPlaylistRes, AddSongToPlaylistRes, LikeSongsRes, SongLikeRes, SongLevel, SongDataRes, SongLyricKeyFrameRes, SongCheckRes, SongLyricRes } from './interfaces'


/**
 * @param id -歌曲id
 * @returns 检查歌曲是否可以用
 */
export const checkSong = (id: number) => {
    return request.get<SongCheckRes>('/check/music', { params: { id } })
}

/**
 * 获取歌曲播放数据
 * @param id 
 * @param level 
 * @returns 
 */
export const getSongData = (id: number, level: SongLevel) => {
    return request.get<SongDataRes>('/song/url/v1', { params: { id, level } })
}


/**
 * 获取歌曲的逐帧歌词
 * @param id 
 * @returns 
 */
export const getSongKeyFrameLyric = (id: number) => {
    return request.get<SongLyricKeyFrameRes>('/lyric/new', { params: { id } })
}

/**
 * 获取歌曲的歌词
 * @param id 
 * @returns 
 */
export const getSongLyric = (id: number) => {
    return request.get<SongLyricRes>('/lyric', { params: { id } })
}

/**
 * 喜欢/取消喜欢音乐
 * @param id 
 * @param like - 真为喜欢,假为取消喜欢
 */
export const toggleLikeSong = (id: number, like: boolean) => {
    return request.get<SongLikeRes>('/like', { params: { id, like } })
}

/**
 * 获取当前用户喜欢的音乐列表 (需要登陆)
 */
export const getLikeSongList = () => request.get<LikeSongsRes>('/likelist')


/**
 * 添加歌曲到歌单
 * @param pid - 歌单id
 * @param tracks - 歌曲id
 * @returns 
 */
export const addSongToPlaylist = (pid: number, tracks: number) => {
    return request.get<AddSongToPlaylistRes>('/playlist/tracks', {
        params: {
            op: "add",
            pid,
            tracks
        }
    })
}

/**
 * 从歌单中移除歌曲
 * @param pid 
 * @param tracks 
 * @returns 
 */
export const removeSongToPlaylist = (pid: number, songsId: number[]) => {
    return request.get<RemoveSongToPlaylistRes>('/playlist/tracks', {
        params: {
            op: "del",
            pid,
            tracks: songsId.join(',')
        }
    })
}