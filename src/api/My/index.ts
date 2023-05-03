import type { UserAccountRes,LevelRes } from './interfaces'
import request from '@/utils/request'

/**
 * 账号信息（根据cookie获取用户信息）
 */
export const getUserAccount = () => {
   return request.get<UserAccountRes>('/user/account')
}

/**
 * 获取用户等级
 * @returns 
 */
export const getUserLevel = () => {
   return request.get<LevelRes>('/user/level')
}