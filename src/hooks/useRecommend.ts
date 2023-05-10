import { reactive, ref, onMounted } from 'vue'
/**
 * 获取推荐歌单 mv 音乐钩子
 * @param cb - 获取数据的调用api函数
 * @泛型 Data - 数据项的类型
 */
const useRecommend = <Data>(cb: () => any) => {
    // 列表数据
    const list = reactive<Data[]>([])
    // 是否在加载
    const isLoading = ref(false)

    // 组件渲染时获取数据
    onMounted(async () => {
        isLoading.value = true
        const res: any = await cb()
        if (res.code === 200) {
            res.result.forEach((ele: any) => {
                list.push(ele)
            })
        }
        isLoading.value = false
    })


    return {
        list,
        isLoading
    }
}

export default useRecommend