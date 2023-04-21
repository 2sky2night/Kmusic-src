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

