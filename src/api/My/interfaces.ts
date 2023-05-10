import { Profile } from "../public/user/interfaces";
/**
 * 账户信息的响应user/account
 */
export interface UserAccountRes {
    account: Account;
    code: number;
    profile: Profile;
}

/**
 * 账户信息
 */
export interface Account {
    /**
     * 创建时间
     */
    createTime: number;
    /**
     * 用户id
     */
    id: number;
    /**
     * 用户名称(手机号?)
     */
    userName: string;
    /**
     * vip等级
     */
    vipType: number;
}

/**
 * 获取用户等级信息 /user/level
 */
export interface LevelRes {
    code: number;
    data: {
        info: string;
        level: number;
        nextLoginCount: number;
        nextPlayCount: number;
        nowLoginCount: number;
        nowPlayCount: number;
        progress: number;
        userId: number;
};
    full: boolean;
}