/**
 * 注意热门评论只有offset 0 
 */
export interface CommentRes {
    cnum: number;
    code: number;
    /**
     * 当前页的评论
     */
    comments: Comment[];
    /**
     * 热门评论
     */
    hotComments: Comment[];
    more: boolean;
    moreHot: boolean;
    /**
     * 置顶的评论
     */
    topComments: string[];
    total: number;
    /**
     * 登录的用户id
     */
    userId: number;
}

/**
 * 一条评论
 */
export interface Comment {
    /**
     * 评论的回复
     */
    beReplied: CommentBeReplied[];
    /**
     * 评论的id
     */
    commentId: number;
    /**
     * 评论的内容
     */
    content: string;
    /**
     * ip信息
     */
    ipLocation: CommentLocation;
    /**
     * 是否点赞
     */
    liked: boolean;
    /**
     * 点赞的数量
     */
    likedCount: number;
    /**
     * 是不是自己
     */
    owner: boolean;
    /**
     * 回复某个评论
     */
    parentCommentId: number;
    status: number;
    /**
     * 发布时间
     */
    time: number;
    /**
     * 时间
     */
    timeStr: string;
    /**
     * 用户信息
     */
    user: CommentUser;
}

/**
 * 回复评论
 */
export interface CommentBeReplied {
    beRepliedCommentId: number;
    content: string;
    expressionUrl: null;
    ipLocation: CommentLocation;
    richContent: null;
    status: number;
    user: CommentUser;
}

/**
 * 评论的ip信息
 */
export interface CommentLocation {
    ip: null;
    location: string;
    userId: number;
}


/**
 * 评论的用户信息
 */
export interface CommentUser {
    authStatus: number;
    avatarUrl: string;
    followed: boolean;
    mutual: boolean;
    nickname: string;
    target: null;
    userId: number;
    userType: number;
    /**
     * vips信息,不是vip的话值为null
     */
    vipRights: VipInfor;
    vipType: number;
}

/**
 * vip信息
 */
export interface VipInfor {
    associator: Associator;
    musicPackage: MusicPackage;
    redplus: null;
    redVipAnnualCount: number;
    redVipLevel: number;
}

/**
 * 黑椒vip信息
 */
export interface Associator {
    iconUrl: string;
    rights: boolean;
    vipCode: number;
}

/**
 * 会员信息
 */
export interface MusicPackage {
    iconUrl: string;
    rights: boolean;
    vipCode: number;
}

/**
 * 评论的类型
 * 0: 歌曲
1: mv
2: 歌单
3: 专辑
 */
export type CommentType = 0 | 1 | 2 | 3

/**
 * 发送评论的响应体 /comment
 */
export interface SendCommentRes {
    code: number;
    comment: {
        beRepliedUser: null;
        commentId: number;
        commentLocationType: number;
        content: string;
        expressionUrl: null;
        needDisplayTime: boolean;
        owner: boolean;
        richContent: null;
        time: number;
        user: CommentUser;
    };
    msg: string;
    message: string;
    star: boolean;
}