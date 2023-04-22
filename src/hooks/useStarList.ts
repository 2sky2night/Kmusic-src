import { onMounted, reactive, ref, watch } from 'vue'
import useRouteInfor from './useRouteInfor'
import message from '@/utils/message'
import { useRouter,onBeforeRouteUpdate } from 'vue-router'
/**
 * T为调用接口的返回值,D为数据的类型
 *  获取用户收藏数据钩子
 * @param cb - 获取的api函数 统一需要传入page来获取某一页的数据
 * @returns 
 */
const useStarList = <T, D>(cb: (page: number, limit?: number) => Promise<T>) => {
    const $router = useRouter()
    // 获取查询参数
    const { query, $route } = useRouteInfor()
    // 根据查询参数初始化页数
    const page = ref(query.page ? + query.page : 1)
    // 一页多少条数据
    const limit = 20
    /**
     * 总共页数
     */
    let pages = ref(0)
    // 所有数据
    const list = reactive<D[]>([])
    // 还有更多吗?
    const hasMore = ref(true)
    // 请求到空的页数
    const isEmpty = ref(false)
    /**
     * 获取数据的函数
     */
    async function getData() {
        const res: any = await cb(page.value)
        hasMore.value = res.hasMore
        // 请求到了空的页数
        if (res.data.length === 0) {
            isEmpty.value = true
            message("请求的页数非法", "error")
        }
        if (res.code === 200) {
            // 清空数据
            list.splice(0, list.length)
            res.data.forEach(((ele: any) => {
                list.push(ele)
            }))
            // 返回总条数
            return res.count
        }

        // // 提示信息
        // hasMore.value ? page.value++ : message("没有更多了 🥱", "info")
    }

    onMounted(async () => {
        // 获取到总条数
        const count: number = await getData()
        const page = count / limit
        console.log(page, parseInt(page + ''));

        if (page === parseInt(page + '')) {
            // 若为整数,设置总页数
            pages.value = page
        } else {
            // 若不为整数
            pages.value = Math.floor(page) + 1
        }
    })

    // 监听当前页的变化
    watch(page, (v) => {
        $route.query.page = v + ''
        console.log(123);
        
        // $router.push({
        //     path: '/my/star-album',
        //     query: {
        //         page:v
        //     }
        // })
    })

    // // 检测到路由更新要执行的回调
    // onBeforeRouteUpdate(() => {
    //     console.log('路由更新了');
    // })

    return {
        page,
        pages,
        list,
        hasMore,
        getData,
        isEmpty
    }
}

export default useStarList
