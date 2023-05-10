import type { Song } from "@/api/public/indexfaces";
import type { SongLyricKeyFrame } from "@/api/public/song/interfaces";
export interface PlayingSongData {
    id: number | null;
    name: string;
    isPlaying: boolean;
    src: string;
    artists: { id: number; name: string }[]
    album: { id: number; name: string, picUrl: string };
    isLike: boolean;
    isVip: boolean;
    /**
     * 当前播放的歌曲歌词
     */
    songLyric: SongLyricKeyFrame | null;
    /**
     * 歌曲的持续时间
     */
    duration: number;
    currentTime: number;
    /**
     * 音量
     */
    volume: number;
    /**
     * 0列表播放 1单曲循环播放 2随机播放 
     */
    playType: 0 | 1 | 2
}

export interface StoreData {
    playingSong: PlayingSongData;
    /**
     * 播放的历史记录
     */
    history: Song[];
    /**
     * 当前的播放列表
     */
    songList: Song[];
}
