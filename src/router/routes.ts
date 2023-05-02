import type { RouteRecordRaw } from "vue-router";
import { useUserStoreWithout } from "@/store/user";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: 'home',
        component: () => import("@/pages/Home/Home.vue"),
        meta: {
            title: "首页",
            /**
             * 缓存首页
             */
            keepAlive: true
        },
    },
    {
        path: "/discover",
        name: 'discover',
        component: () => import("@/pages/Discover/Discover.vue"),
        meta: {
            title: "发现",
        },
        children: [
            {
                path: "",
                redirect: "/discover/playlist",
                name: 'discover-empty'
            },
            {
                path: "playlist",
                name: 'discover-playlist',
                component: () =>
                    import("@/pages/Discover/children/PlayList/PlayList.vue"),
                meta: {
                    title: "发现歌单",
                },
            },
            {
                path: "song",
                name: 'discover-song',
                component: () => import("@/pages/Discover/children/Song/Song.vue"),
                meta: {
                    title: "发现歌曲",
                },
            },
            {
                path: "artist",
                name: 'discover-artist',
                component: () => import("@/pages/Discover/children/Artist/Artist.vue"),
                meta: {
                    title: "发现歌手",
                },
            },
        ],
    },
    {
        path: "/login",
        name: 'login',
        component: () => import("@/pages/Login/Login.vue"),
        meta: {
            title: "登录",
        },
        beforeEnter(to, from, next) {
            const userStore = useUserStoreWithout()
            if (userStore.cookie && userStore.isLogin) {
                // 已经登录了,不能进入该页面
                (window as any).$message.error("不要重复登录!🙅‍");
                // // 修正hash值
                // location.hash = from.path
                // // 修正浏览器的标题
                // setTimeout(() => {
                //     document.title = from.meta.title as string
                // })
                next(false)
            } else {
                next()
            }
        }
    },
    {
        path: "/my",
        name: 'my',
        component: () => import("@/pages/My/My.vue"),
        meta: {
            title: "我的",
            /**
             * 需要登录的页面
             */
            auth: true,
        },
        children: [
            {
                path: "",
                redirect: "/my/playlist",
                name: 'my-empty'
            },
            {
                path: "playlist",
                name: 'my-playlist',
                component: () => import("@/pages/My/children/PlayList/PlayList.vue"),
                meta: {
                    title: "我的歌单",
                    /**
                     * 需要登录的页面
                     */
                    auth: true,
                },
            },
            {
                path: "star-album/:page",
                name: 'my-album',
                component: () => import("@/pages/My/children/StarAlbum/StarAlbum.vue"),
                meta: {
                    title: "收藏的专辑",
                    /**
                     * 需要登录的页面
                     */
                    auth: true,
                },
            },
            {
                path: "star-artist/:page",
                name: 'my-artist',
                component: () => import("@/pages/My/children/StarArtist/StarArtist.vue"),
                meta: {
                    title: "收藏的歌手",
                    /**
                     * 需要登录的页面
                     */
                    auth: true,
                }
            },
            {
                path: "star-mv/:page",
                name: 'my-mv',
                component: () => import("@/pages/My/children/StarMV/StarMV.vue"),
                meta: {
                    title: "收藏的mv",
                    /**
                     * 需要登录的页面
                     */
                    auth: true,
                }
            }
        ]
    },
    {
        path: '/playlist/:id',
        component: () => import('@/pages/Playlist/Playlist.vue'),
        meta: {
            title: "歌单详情"
        }
    },
    {
        path: '/album/:id',
        component: () => import('@/pages/Album/Album.vue'),
        meta: {
            title: '专辑详情'
        }
    },
    {
        path: '/mv/:id',
        component: () => import('@/pages/MV/MV.vue'),
        meta: {
            title: 'mv 详情'
        }
    },
    {
        path: '/user/:id',
        component: () => import('@/pages/User/User.vue'),
        meta: {
            title: '用户详情'
        }
    },
    {
        path: '/artist/:id',
        component: () => import('@/pages/Artist/Artist.vue'),
        meta: {
            title: '歌手详情'
        }
    },
    {
        path: '/song/:id',
        component: () => import('@/pages/Song/Song.vue'),
        meta: {
            title: '歌曲详情'
        }
    },
    {
        path: '/daily-song',
        component: () => import('@/pages/DailySong/DailySong.vue'),
        meta: {
            title: "每日推荐",
            auth: true
        }
    },
    {
        path: '/playlist-comment/:id',
        component: () => import('@/pages/PlaylistCmt/PlaylistCmt.vue'),
        meta: {
            title: "歌单评论"
        }
    },
    {
        path: '/song-comment/:id',
        component: () => import('@/pages/SongCmt/SongCmt.vue'),
        meta: {
            title: "歌曲评论"
        }
    },
    {
        path: '/album-comment/:id',
        component: () => import('@/pages/AlbumCmt/AlbumCmt.vue'),
        meta: {
            title: "专辑评论"
        }
    },
    {
        path: '/artist-songs/:id',
        component: () => import('@/pages/ArtistSongs/ArtistSongs.vue'),
        meta: {
            title: "歌手的全部歌曲"
        }
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/pages/404/404.vue"),
        meta: {
            title: "404"
        },
    },
    {
        path: "/:catchAll(.*)", // 不识别的path自动重定向到404
        redirect: "/404",
    },
];

export default routes;
