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
        ids: number[]
    }
}