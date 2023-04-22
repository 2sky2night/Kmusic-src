import type { UserDetailRes, PlaylistRes } from '@/api/public/user/interfaces'
import request from '@/utils/request'

/**
 * 账号信息（根据cookie获取用户信息）
 * @param uid - 用户id
 */
export const getUserDetial = (uid: number) => {
    return request.get<UserDetailRes>('/user/detail', { params: { uid } })
}

/**
 * 获取用户的歌单
 * @param uid - 用户id
 * @param page - 加载第几页数据
 * @param limit - 获取多少条数据
 */
export const getUserPlayList = (uid: number, page: number, limit: number = 20) => {
    return request.get<PlaylistRes>('/user/playlist', { params: { uid, offset: (page-1) * limit, limit } })
}

