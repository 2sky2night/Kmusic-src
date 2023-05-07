<template>
    <div class="search-suggest">
        <n-scrollbar style="max-height: 400px;min-height: 200px;">
            <div v-if="isLoading" class="tips">
                <n-spin size="medium" />
            </div>
            <ul class="suggest-list" v-if="!isLoading && !isEmpty">
                <li v-for="suggestType in order" :key="suggestType">
                    <div class="title">
                        <n-icon style="position: relative;top:2px">
                            <component :is="suggestType"></component>
                        </n-icon>
                        <span>{{ formatTitle(suggestType) }}</span>
                    </div>
                    <ul>
                        <li @click="() => toSearch(suggestType, item.name, item.id)" v-for="item in result[suggestType]"
                            :key="item.id" class="suggest-item">
                            {{ item.name }}
                        </li>
                    </ul>
                </li>
            </ul>
            <div v-if="isEmpty&&!isLoading" class="tips" style="align-items: center;">
                没有搜索建议 🥵
            </div>
        </n-scrollbar>
    </div>
</template>
<script lang="ts">
// 图标
import { IosMusicalNotes as songs, IosAlbums as albums, IosFolderOpen as playlists } from '@vicons/ionicons4'
import { UserOutlined as artists } from '@vicons/antd'
import { defineComponent } from 'vue';
export default defineComponent({
    components: {
        songs,
        albums,
        playlists,
        artists
    }
})
</script >
<script lang='ts' setup>
// 钩子
import useSearchStore from '@/store/search'
import { storeToRefs } from 'pinia';
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router';
// 工具函数
import { debounce } from '@/utils/tools';
import message from '@/utils/message';
// 接口
import { SuggestItem, SuggestType } from '@/api/Search/interfaces'
// api
import { getSearchSuggest } from '@/api/Search';

// 搜索仓库
const searchStore = useSearchStore()
const { keywords } = storeToRefs(searchStore)
// 排序依据
const order = reactive<SuggestType[]>([])
// 搜索结果
const result = reactive<{
    albums: SuggestItem[];
    artists: SuggestItem[];
    songs: SuggestItem[];
    playlists: SuggestItem[];
}>({ albums: [], artists: [], songs: [], playlists: [] })
// 正在加载?
const isLoading = ref(true)
// 是否为空
const isEmpty = ref(false)
// 路由对象
const $router = useRouter()

/**
 * 获取搜索建议
 */
async function getData() {
    isLoading.value = true
    // 清空排序依据
    order.length = 0
    // 清空搜索建议
    clearSuggest()
    // 检查输入内容是否合法
    if (!keywords.value) return
    try {
        const res = await getSearchSuggest(keywords.value)
        if (res.code !== 200) await Promise.reject()

        // 判断搜索结果是否为空
        if (!Object.keys(res.result).length) {
            isEmpty.value = true
            isLoading.value = false
            //  message("输入的太犀利了, 没有建议呢😅", "info")
            return
        }

        isEmpty.value = false

        // 获取排序依据
        res.result.order.forEach(ele => {
            order.push(ele)
        })

        // 保存对应板块的结果
        order.forEach(key => {
            res.result[key].forEach(ele => {
                result[key].push(ele)
            })
        })

        isLoading.value = false

    } catch (error) {
        message("获取搜索建议失败 😃", 'warning')
    }
}

/**
 * 清空搜索建议结果
 */
function clearSuggest() {
    Object.keys(result).forEach(key => {
        result[key as SuggestType].length = 0
    })
}

/**
 * 格式化搜索类别
 */
function formatTitle(title: SuggestType) {
    switch (title) {
        case 'albums': return '专辑';
        case 'artists': return '歌手';
        case 'songs': return '歌曲';
        case 'playlists': return '歌单';
    }
}

/**
 * 
 * @param type - 搜索的资源类型
 * @param name - 搜索的关键词
 * @param id - 资源的id
 */
function toSearch(type: SuggestType, name: string, id: number) {
    // 向仓库添加搜索记录记录
    searchStore.addHistory(name, Date.now())
    // 跳转到对应页面
    switch (type) {
        case 'albums': $router.push(`/album/${id}`); break;
        case 'artists': $router.push(`/artist/${id}`); break;
        case 'songs': $router.push(`/song/${id}`); break;
        case 'playlists': $router.push(`/playlist/${id}?page=1`); break;
    }
}

/**
 * 获取搜索建议防抖版
 */
const getDataDebounce = debounce(getData, 500)

// 监听输入的内容,内容发送变化就获取数据 
// 开启立即监听是因为在该组件被渲染时是当前keywords有内容了
// 需要以当前内容获取数据
watch(keywords, (v) => {
    // 当前不为空串就获取数据
    if (v.trim().length) getDataDebounce()
}, { immediate: true })

</script>
<style scoped lang="scss">
.tips {
    display: flex;
    justify-content: center;
    height: 200px;
}

.search-suggest {
    .suggest-list {
        margin: 10px 5px;
        box-sizing: border-box;
        padding: 0 5px;
    }
}

.suggest-item {
    color: var(--text-color);
    padding: 10px;
    transition: .3s;
    border-radius: 10px;
    transition-property: background-color;
    cursor: pointer;
    font-size: 13px;
}

.suggest-item:hover {
    background-color: var(--hover-bg-color);
}

.title {
    color: var(--color-primary);
    font-size: 16px;
    font-weight: 600;

    span {
        margin-left: 5px;
    }
}
</style>