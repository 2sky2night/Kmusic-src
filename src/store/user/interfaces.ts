import { Playlist } from "@/api/public/indexfaces";
export default interface UserStoreState {
    cookie: null | string;
    isLogin: boolean;
    userData: {
        id: number | null;
        level: number;
        nickname: string | null;
        avatar: string;
        /**
        * 喜欢的歌曲id
        */
        ids: number[],
        /**
         * 收藏的专辑id
         */
        idAlbums: number[],
        /**
         * 用户自己自己的歌单
         */
        myPlaylists: Playlist[]
    }
}