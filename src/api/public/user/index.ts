import type { UserDetailRes, PlaylistRes, FollowRes, ReSongsRes } from '@/api/public/user/interfaces'
import request from '@/utils/request'

/**
 * 账号信息（根据id获取用户信息）
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
export const getUserPlayList = (uid: number, offset: number, limit: number = 20) => {
    return request.get<PlaylistRes>('/user/playlist', { params: { uid, offset, limit } })
}

/**
 * 
 * @param uid - 要关注或取消关注的目标用户id
 * @param t - 关注类型 1为关注其他为取消关注
 * @returns 
 */
export const followUser = (uid: number, t: number) => {
    return request.get<FollowRes>('/follow', { params: { uid, t } })
}

/**
 * 获取每日推荐 (需要登陆)
 * @returns 
 */
export const getReSongs = () => request.get<ReSongsRes>('/recommend/songs')

/**
 * 登出
 */
export const logout = () => request.get<{ code: number }>('/logout')