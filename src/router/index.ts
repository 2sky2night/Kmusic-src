import { createRouter, createWebHashHistory } from 'vue-router'
import nProgress from 'nprogress';
import routes from "./routes";
import { useUserStoreWithout } from '@/store/user';

const userStore = useUserStoreWithout()

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    // 滚动条置于窗口顶部(滑动到顶部)
    // scrollBehavior() {
    //     return {
    //         top: 0
    //     }
    // }
})


// 全局前置守卫
router.beforeEach((to, from, next) => {
    nProgress.start()

    if (to.meta.auth) {
        // 访问权限页面
        if (userStore.isLogin && userStore.cookie) {
            // 登录状态并有cookie值才能访问该页面
            next()
            return
        } else {
            // 未登录,不能访问
            (window as any).$message.error('请先登录!');
            next(from.path)
            return
        }
    }

    next()
})

// 全局后置守卫
router.afterEach(to => {
    // 关闭进度条
    nProgress.done()
    document.title = to.meta.title as string || to.path
})

export default router