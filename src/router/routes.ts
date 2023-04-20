import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("@/pages/Home/Home.vue"),
        meta: {
            title: "首页",
        },
    },
    {
        path: "/discover",
        component: () => import("@/pages/Discover/Discover.vue"),
        meta: {
            title: "发现",
        },
        children: [
            {
                path: "",
                redirect: "/discover/playlist",
            },
            {
                path: "playlist",
                component: () =>
                    import("@/pages/Discover/children/PlayList/PlayList.vue"),
                meta: {
                    title: "发现歌单",
                },
            },
            {
                path: "song",
                component: () => import("@/pages/Discover/children/Song/Song.vue"),
                meta: {
                    title: "发现歌曲",
                },
            },
            {
                path: "artist",
                component: () => import("@/pages/Discover/children/Artist/Artist.vue"),
                meta: {
                    title: "发现歌手",
                },
            },
        ],
    },
    {
        path: "/login",
        component: () => import("@/pages/Login/Login.vue"),
        meta: {
            title: "登录",
        },
    },
    {
        path: "/my",
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
            },
            {
                path: "playlist",
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
                path: "star-album",
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
                path: "star-artist",
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
                path: "star-mv",
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
        path: "/404",
        name: "404",
        component: () => import("@/pages/404/404.vue"),
        meta: {
            title: "404",
            noAuthorization: true,
        },
    },
    {
        path: "/:catchAll(.*)", // 不识别的path自动重定向到404
        redirect: "/404",
    },
];

export default routes;
