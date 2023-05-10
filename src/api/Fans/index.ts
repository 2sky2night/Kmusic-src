import { FansRes } from "../public/user/interfaces";
import request from "@/utils/request";

/**
 * 获取粉丝列表
 * @param uid 
 * @param offse - 从第几个开始获取数据
 * @param limit 
 * @returns 
 */
export const getUserFans= (uid: number, offset: number, limit: number = 20) => {
    return request.get<FansRes>('/user/followeds', {
        params: {
            uid,
            offset,
            limit
        }
    })
}