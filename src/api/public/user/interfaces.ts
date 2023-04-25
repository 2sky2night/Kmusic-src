import { Playlist, User } from "../indexfaces";
/**
 * 用户详情信息的响应/user/detail
 */
export interface UserDetailRes {
  code: number;
  createDays: number;
  createTime: number;
  /**
   * 用户等级
   */
  level: number;
  /**
   * 用户是否能看到我的歌单
   */
  peopleCanSeeMyPlayRecord: boolean;
  profile: Profile;
}

/**
  * 用户资料
  */
export interface Profile {
  privacyItemUnlimit: PrivacyItemUnlimit;
  /**
   * 头像id
   */
  avatarImgId: number;
  /**
   * 头像地址
   */
  avatarUrl: string;
  /**
   * 个人背景图片id
   */
  backgroundImgId: number;
  /**
  * 个人背景图片的url
  */
  backgroundUrl: string;
  /**
   * 生日
   */
  birthday: number;
  createTime: number;
  /**
   * 用户描述
   */
  description: null | string;
  detailDescription: null | string;
  /**
   * 我关注了吗?
   */
  followed: boolean;
  gender: number;
  lastLoginIP: string;
  lastLoginTime: number;
  nickname: string;
  /**
   * 动态数量
   */
  eventCount: number
  /**
   * 签名
   */
  signature: null | string;
  /**
   * 用户id
   */
  userId: number;
  /**
   * 用户名称
   */
  userName: string;
  /**
   * 粉丝数量
   */
  followeds: number;
  /**
   * 关注我了吗
   */
  followMe: boolean;
  /**
   * 关注人数
   */
  follows: number;
  followTime: null;
}

/**
 * 隐私相关的信息
 */
export interface PrivacyItemUnlimit {
  age: boolean;
  area: boolean;
  college: boolean;
  gender: boolean;
  villageAge: boolean;
}

/**
 * 用户歌单的响应体/album/sublist
 */
export interface PlaylistRes {
  code: number;
  more: boolean;
  playlist: Playlist[];
  version: string;
}

/**
 * 关注/取消关注用户的响应体/follow
 */
export interface FollowRes {
  code: number;
  /**
   * 关注欢迎词
   */
  followContent: string;
  /**
   * 关注时间
   */
  followTimeContent: string;
  /**
   * 用户名称
   */
  py: string;
  /**
   * 用户的基本信息
   */
  user: User;
}

/**
 * 每日推荐 /recommend/songs
 */
export interface ReSongsRes {
  code: number;
  data: {
    dailySongs: DailySong[];
    mvResourceInfos: null;
    orderSongs: string[];
    recommendReasons: RecommendReason[];
  }
}

/**
 * 
 */
export interface DailySong {
  cp: number;
  dt: number;
  /**
   * 歌曲id
   */
  id: number;
  /**
   * 标记次数
   */
  mark: number;
  mst: number;
  mv: number;
  /**
   * 歌曲名称
   */
  name: string;
  pop: number;
  /**
   * 发布时间
   */
  publishTime: number;
  /**
   * 收藏原因
   */
  reason: null | string;
  /**
  * 收藏原因
 */
  recommendReason: null | string;
  resourceState: boolean;
}



/**
 * 推荐歌曲的原因
 */
export interface RecommendReason {
  reason: string;
  reasonId: string;
  /**
   * 推荐歌曲的对应的歌曲id
   */
  songId: number;
}
