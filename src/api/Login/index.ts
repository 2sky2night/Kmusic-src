import { KeyCode, CodeState, CreateCode, ResponseType } from './interfaces'
import request from '@/utils/request'

/**
 * 获取二维码的key
 * @returns 
 */
export const getKeyCode = () => {
    return request.get<ResponseType<KeyCode>>('/login/qr/key')
}

/**
 * 创建二维码
 * @param key - unikey
 * @returns 
 */
export const createCode = (key: string) => {
    return request.get<ResponseType<CreateCode>>('/login/qr/create', { params: { key, qrimg: true } })
}

/**
 * 检查扫码状态
 * @param key 
 * @returns 
 */
export const getCodeState = (key: string) => {
    return request.get<CodeState>('/login/qr/check', { params: { key } })
}