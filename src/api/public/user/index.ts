import type { UserDetailRes } from '@/api/public/user/interfaces'
import request from '@/utils/request'

/**
 * 账号信息（根据cookie获取用户信息）
 * @param uid - 用户id
 */
export const getUserDetial = (uid: number) => {
    return request.get<UserDetailRes>('/user/detail', { params: { uid } })
}