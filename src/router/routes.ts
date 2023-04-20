import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import("@/pages/Home/Home.vue"),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/login',
        component: () => import("@/pages/Login/Login.vue"),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/my',
        component: () => import("@/pages/My/My.vue"),
        meta: {
            title: '我的',
            /**
             * 需要登录的页面
             */
            auth: true
        }
    },
    {
        path: '/404',
        name: '404',
        component: () => import("@/pages/404/404.vue"),
        meta: {
            title: "404",
            noAuthorization: true
        }
    },
    {
        path: "/:catchAll(.*)", // 不识别的path自动重定向到404
        redirect: '/404',
    },
]

export default routes