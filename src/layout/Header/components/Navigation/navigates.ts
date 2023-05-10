import { useUserStoreWithout } from "@/store/user";
// 用仓库的状态,来初始化渲染导航栏
const userStore = useUserStoreWithout()
/**
 * 导航路由表 
 */
export default [
    { path: '/', title: '首页', isActive: false, children: [], isShow: true },
    {
        path: '/discover',
        title: '发现',
        isActive: false,
        /**
         * 是否显示该导航栏
         */
        isShow: true,
        children: [
            /**
             * 为了迎合组件库的配置项api,只能将path和title改成key和label
             */
            {
                key: '/discover/playlist',
                label: '歌单',
            },
            {
                key: '/discover/song',
                label: '歌曲',
            },
            {
                key: '/discover/artist',
                label: '歌手',
            }
        ]
    },
    {
        path: '/my',
        title: '我的',
        isActive: false,
        isShow: userStore.cookie && userStore.isLogin ? true : false,
        children: [
            {
                key: '/my/playlist',
                label: '我的歌单',
            },
            {
                key: '/my/star-artist/1',
                label: '收藏的歌手',
            },
            {
                key: '/my/star-album/1',
                label: '收藏的专辑',
            },
            {
                key: '/my/star-mv/1',
                label: '收藏的mv',
            }
        ]
    },
    { path: '/login', title: '登录', isActive: false, children: [], isShow: !userStore.cookie && !userStore.isLogin ? true : false, }
]

export interface NavChildren {
    key: string;
    label: string;
}