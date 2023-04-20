import { createRouter, createWebHashHistory } from 'vue-router'
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

router.afterEach(to => {
    document.title = to.meta.title as string || to.path
})

export default router