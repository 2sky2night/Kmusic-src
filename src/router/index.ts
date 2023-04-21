import { createRouter, createWebHashHistory } from 'vue-router'
import nProgress from 'nprogress';
import routes from "./routes";

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
    next()
})

// 全局后置守卫
router.afterEach(to => {
    // 关闭进度条
    nProgress.done()
    document.title = to.meta.title as string || to.path
})

export default router