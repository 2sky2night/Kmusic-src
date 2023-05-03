import { FollowsRes } from "../public/user/interfaces";
import request from "@/utils/request";

/**
 * 获取关注列表
 * @param uid 
 * @param offset 
 * @param limit 
 * @returns 
 */
export const getUserFollow = (uid: number, offset: number, limit: number = 20) => {
    return request.get<FollowsRes>('/user/follows', {
        params: {
            uid,
            offset,
            limit
        }
    })
}