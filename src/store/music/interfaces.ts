export interface PlayingSongData {
    id: number | null;
    name: string;
    isPlaying: boolean;
    src: string;
    artists: { id: number; name:string}[]
    album: { id: number; name: string, picUrl: string };
    isLike: boolean;
    isVip: boolean;
}