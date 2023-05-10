export default interface CodeData {
    /**
     * 二维码的key值
     */
    unikey: string;
    /**
     * 二维码的扫码状态
     * ,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
     */
    code: 800 | 801 | 802 | 803,
    /**
     * 用户cookie值
     */
    cookie: null | string;
    username: string | null;
}