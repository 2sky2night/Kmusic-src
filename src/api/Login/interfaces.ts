/**
 * 二维码登录的基本响应数据类型
 */
export interface ResponseType<T> {
    data: T,
    code: number
}

/**
 * 获取二维码key
 */
export interface KeyCode {
    code: number,
    unikey: string
}

/**
 * 生成二维码的base64字符串
 */
export interface CreateCode {
    /**
    * 二维码的base64编码
    */
    qrimg: string;
    qrurl: string;
}


/**
 * 获取当前二维码扫描状态
 */
export interface CodeState {
    /**
     * 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
     */
    code: 800 | 801 | 802 | 803;
    /**
     * 用户的cookie
     */
    cookie: string;
    message: string;
    nickname: string;
}