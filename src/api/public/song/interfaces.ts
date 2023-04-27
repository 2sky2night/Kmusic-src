/**
 * 歌曲的URL /song/url/v1
 */
export interface SongDataRes {
    code: number;
    data: SongData[];
}


export interface SongData {
    br: number;
    canExtend: boolean;
    code: number;
    effectTypes: null;
    encodeType: string;
    expi: number;
    fee: number;
    flag: number;
    freeTimeTrialPrivilege: FreeTimeTrialPrivilege;
    freeTrialInfo: null;
    freeTrialPrivilege: FreeTrialPrivilege;
    gain: number;
    /**
     * 歌曲id
     */
    id: number;
    level: string;
    md5: string;
    payed: number;
    peak: number;
    podcastCtrp: null;
    rightSource: number;
    /**
     * 歌曲大小
     */
    size: number;
    /**
     * 歌曲时间
     */
    time: number;
    type: string;
    uf: null;
    /**
     * 歌曲的地址
     */
    url: string;
    urlSource: number;
}

export interface FreeTimeTrialPrivilege {
    remainTime: number;
    resConsumable: boolean;
    type: number;
    userConsumable: boolean;
}

export interface FreeTrialPrivilege {
    cannotListenReason: string;
    listenType: null;
    resConsumable: boolean;
    userConsumable: boolean;
}

/**
 * `level`: 播放音质等级, 
 * 分为 `standard` => `标准`,`higher` => `较高`, 
 * `exhigh`=>`极高`, `lossless`=>`无损`, `hires`=>`Hi-Res
 */
export type SongLevel = "standard" | "higher" | "exhigh" | "lossless" | "hires"

/**
 * 歌曲是否可用 /check/music
 */
export interface SongCheckRes {
    message: string;
    success: boolean;
}

/**
 * 获取逐帧歌词 /lyric/new
 */
export interface SongLyricKeyFrameRes {
    code: number;
    klyric: Klyric;
    lrc: Lrc;
    qfy: boolean;
    romalrc: Romalrc;
    sfy: boolean;
    sgc: boolean;
    tlyric: Tlyric;
    yrc: Yrc;
    ytlrc: Ytlrc;
}

export interface Klyric {
    lyric: string;
    version: number;
}

export interface Lrc {
    lyric: string;
    version: number;
}

export interface Romalrc {
    lyric: string;
    version: number;
}

export interface Tlyric {
    lyric: string;
    version: number;
}

export interface Yrc {
    lyric: string;
    version: number;
}

export interface Ytlrc {
    lyric: string;
    version: number;
}

/**
 * 获取歌词 /lyric
 */
export interface SongLyricRes {
    code: number;
    klyric: Klyric;
    lrc: Lrc;
    qfy: boolean;
    romalrc: Romalrc;
    sfy: boolean;
    sgc: boolean;
    tlyric: Tlyric;
}