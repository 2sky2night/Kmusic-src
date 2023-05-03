import { Playlist, User, Song } from "../indexfaces";
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
    dailySongs: Song[];
    recommendReasons: ReReason[];
  }
}

/**
 * 每日推荐的原因
 */
export interface ReReason {
  reason: string;
  reasonId: number;
  /**
   * 推荐歌曲的对应的歌曲id
   */
  songId: number;
}

/**
 * 关注列表的响应体 /user/follows
 */
export interface FollowsRes {
  code: number;
  follow: UserFollow[];
  more: boolean;
  touchCount: number;
}

/**
 * 粉丝列表的响应体 /user/followeds
 */

export interface FansRes {
  code: number;
  followeds: UserFollow[];
  more: boolean;
  size: number;
}

/**
 * 关注 粉丝列表响应回来的用户数据
 */
export interface UserFollow {
  accountStatus: number;
  authStatus: number;
  avatarDetail: AvatarDetail;
  avatarUrl: string;
  blacklist: boolean;
  eventCount: number;
  experts: null;
  expertTags: null;
  followed: boolean;
  followeds: number;
  follows: number;
  gender: number;
  mutual: boolean;
  nickname: string;
  playlistCount: number;
  py: string;
  remarkName: null;
  signature: string;
  time: number;
  userId: number;
  userType: number;
  vipRights: VipRights;
  vipType: number;
}

export interface AvatarDetail {
  identityIconUrl: string;
  identityLevel: number;
  userType: number;
}

export interface VipRights {
  associator: Associator;
  musicPackage: MusicPackage;
  redplus: null;
  redVipAnnualCount: number;
  redVipLevel: number;
}

export interface Associator {
  iconUrl: string;
  rights: boolean;
  vipCode: number;
}

export interface MusicPackage {
  iconUrl: string;
  rights: boolean;
  vipCode: number;
}
