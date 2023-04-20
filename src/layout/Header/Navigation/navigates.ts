/**
 * 导航路由表 
 */
export default [
    { path: '/', title: '首页', isActive: false, children: [] },
    {
        path: '/discover',
        title: '发现',
        isActive: false,
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
        children: [
            {
                key: '/my/playlist',
                label: '我的歌单',
            },
            {
                key: '/my/star-artist',
                label: '收藏的歌手',
            },
            {
                key: '/my/star-album',
                label: '收藏的专辑',
            },
            {
                key: '/my/star-mv',
                label: '收藏的mv',
            }
        ]
    },
    { path: '/login', title: '登录', isActive: false, children: [] }
]

export interface NavChildren {
    key: string;
    label: string;
}