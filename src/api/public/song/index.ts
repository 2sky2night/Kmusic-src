import request from "@/utils/request";
import { SongLevel, SongDataRes, SongLyricKeyFrameRes, SongCheckRes, SongLyricRes } from './interfaces'


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
    return request.get<SongLyricKeyFrameRes>('/lyric/new',{params:{id}})
}

/**
 * 获取歌曲的歌词
 * @param id 
 * @returns 
 */
export const getSongLyric = (id: number) => {
    return request.get<SongLyricRes>('/lyric',{ params: { id } })
}