import { onMounted, reactive, ref, watch } from 'vue'
import useRouteInfor from './useRouteInfor'
import message from '@/utils/message'
import { useRouter } from 'vue-router'
import { countPage } from '@/utils/computed'
/**
 * T为调用接口的返回值,D为数据的类型
 *  获取用户收藏数据钩子
 * @param cb - 获取的api函数 统一需要传入page来获取某一页的数据
 * @param name -路由的名称
 * @returns 
 */
const useStarList = <T, D>(cb: (page: number, limit?: number) => Promise<T>, name: string) => {
    const $router = useRouter()
    // 获取查询参数
    const { $route, params } = useRouteInfor()
    // 根据查询参数初始化页数
    const page = ref(params.page ? + params.page : 1)
    // 一页多少条数据
    const limit = 24
    // 正在加载?
    const isLoading = ref(false)
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
        // 设置正在加载
        isLoading.value = true
        const res: any = await cb(page.value)
        hasMore.value = res.hasMore

        // 请求到了空的页数
        if (res.data.length === 0) {
            isEmpty.value = true
            message("请求的页数非法或还没有收藏呢", "warning")
            isLoading.value = false
            return
        }

        if (res.code === 200) {
            // 清空数据
            list.splice(0, list.length)
            res.data.forEach(((ele: any) => {
                list.push(ele)
            }))
            isLoading.value = false
            // 返回总条数
            return res.count
        }

    }

    onMounted(async () => {

        // 判断当前请求页数是否大于1
        if (page.value > 1) {
            // 获取第一页的数据,因为只有请求第一页时才能获得总页数
            const res:any = await cb(1)
            pages.value = countPage(limit, res.count)
            // 获取请求的某一页
            getData()
        } else if (page.value === 1) {
            // 获取到总条数
            const count: number = await getData()
            pages.value=countPage(limit,count)
        } else {
            message("请求参数非法","error")
            isEmpty.value = true
            isLoading.value=false
        }

    })

    // 监听页数发生变化就更新路由
    watch(page, (v) => {
        $router.push({
            name,
            params: {
                page: v
            }
        })
        getData()
    })

    // 路由的动态参数发生变化就更新page的值
    watch(() => $route.params.page, (v) => {
        console.log(v);
        if (v) {
            page.value = +v
        }

    })

    return {
        isLoading,
        page,
        pages,
        list,
        isEmpty
    }
}

export default useStarList
