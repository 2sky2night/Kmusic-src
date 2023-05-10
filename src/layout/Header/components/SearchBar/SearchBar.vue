<template>
    <n-dropdown style="width:250px" :show="isFocus" :options="keywords ? optionsKeywords : optionsHistory"
        show-arrow>
        <div class="search-bar" :style="{ width: isFocus ? '200px' : '150px' }">
            <n-input size="small" round autosize style="width: 100%" @focus="handler(true)" @blur="handler(false)"
                v-model:value.trim="keywords" type="text" placeholder="搜索歌手/歌曲" @keyup.enter="toSearch">
                <template #prefix>
                    <n-icon>
                        <IosSearchIcon />
                    </n-icon>
                </template>
            </n-input>
        </div>
    </n-dropdown>
</template>
<script lang='ts' setup>
// 图标
import { IosSearch as IosSearchIcon } from '@vicons/ionicons4'
// 钩子
import { ref, h, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
// 仓库
import useSearchStore from '@/store/search'
// api
import { getSearchHotList } from '@/api/Search'
// 组件
import HotAndHistory from './components/HotAndHistory/HotAndHistory.vue'
import SearchSuggest from './components/SearchSuggest/SearchSuggest.vue'
// 接口
import { HotItem } from '@/api/Search/interfaces';
// 工具函数
import message from '@/utils/message'


// 搜索仓库
const searchStore = useSearchStore()
// 是否获得焦点 获得焦点显示搜索菜单
const isFocus = ref(false)
// 搜索关键词
const { keywords } = storeToRefs(searchStore)
// 热搜列表
const hotList:HotItem[] = []
// 钩子
const $router = useRouter()

/**
 * 输入框失焦/焦点的处理函数
 */
function handler(flag: boolean) {
    if (flag) {
        isFocus.value = true
    } else {
        isFocus.value = false
    }
}

// 组件渲染前获取热搜数据
onBeforeMount(async() => {
    try {
        const res = await getSearchHotList()
        if (res.code !== 200) await Promise.reject()
        res.data.forEach(ele => {
            hotList.push(ele)
        })
    } catch (error) {
        message("获取热搜数据失败 🥱","warning")
    }
})

/**
 * 历史记录和搜索热词的渲染配置项
 */
const optionsHistory = [
    {
        type: 'render',
        key: 'history-and-hot',
        render:()=>h(HotAndHistory,{hotList})
    },
]

/**
 * 搜索联想词的渲染配置项
 */
const optionsKeywords = [
    {
        type: 'render',
        key: 'suggest',
        render: () => h(SearchSuggest)
    }
]

/**
 * 按下回车搜索
 */
function toSearch() {
    // 添加历史记录
    searchStore.addHistory(keywords.value,Date.now())
    // 进入搜索页面
    $router.push(`/search/song?keywords=${keywords.value}&page=1`)
}
</script>
<style scoped lang="scss">
.search-bar {
    transition: .3s;
    width: 150px;
    margin: 0 5px;
}
</style>