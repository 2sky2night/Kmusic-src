// 钩子
import { watch, inject, ref, onMounted } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
// 接口
import type { Ref } from 'vue'
// 工具函数
import { checkPage } from '@/utils/tools';
import PubSub from 'pubsub-js';

const useSearchList = (cb: any) => {
    // 元信息
    const $route = useRoute();
    // 路由实例对象
    const $router = useRouter();
    // 当前页数
    const page = ref($route.query.page ? checkPage(+$route.query.page) : 1);
    // 总数
    const total = ref(0);
    // 正在加载
    const isLoading = ref(false);
    // 当前输入的关键词
    const keywords = inject('keywordsNow') as Ref<string>;
    // 每页多少条
    const pageSize = ref(12)
    // 分页配置
    const pageSizes = [
        {
            label: '12 每页',
            value: 12
        },
        {
            label: '24 每页',
            value: 24
        },
        {
            label: '36 每页',
            value: 36
        },
        {
            label: '72 每页',
            value: 72
        },
        {
            label: '100 每页',
            value: 100
        }
    ]

    // 组件渲染时获取数据
    onMounted(async () => {
        isLoading.value = true;
        await cb()
        isLoading.value = false
    })

    watch(page, (v) => {
        $router.push({
            path: $route.path,
            query: {
                keywords: keywords.value,
                page: v
            }
        })
    })

    // 每条页数发生了变化需要重置当前搜索的页数
    watch(pageSize, async () => {

        // 若当前就在第一页,就直接重新获取数据
        if (page.value === 1) {
            isLoading.value = true;
            await cb()
            isLoading.value = false;
            PubSub.publish('to-top');
        } else {
            page.value = 1
            $router.replace({
                path: $route.path,
                query: {
                    keywords: keywords.value,
                    page: 1
                }
            })
        }

    })

    // 路由更新, 有两种对于不同的更新有不同的处理方式
    // 关键词更新 - 重置所有数据
    // 页数更新 - 重置数据,更新页数
    onBeforeRouteUpdate(async (to, from) => {

        isLoading.value = true;

        // 若无keywords查询参数该怎么办?
        const toKeywords = to.query.keywords;
        const fromKeywords = from.query.keywords;
        const toPage = to.query.page ? + to.query.page : 1;
        const fromPage = from.query.page ? +from.query.page : 1;

        if (toPage !== fromPage) {
            // 若页数发生了更新则更新page
            page.value = toPage
        }

        if (toKeywords !== fromKeywords) {
            // 关键词更新需要做的事情 重置页数 重置状态
            page.value = 1;
        }


        // 获取最新数据
        await cb()

        isLoading.value = false
    })

    return {
        page,
        total,
        isLoading,
        keywords,
        pageSize,
        pageSizes
    }
}

export default useSearchList

