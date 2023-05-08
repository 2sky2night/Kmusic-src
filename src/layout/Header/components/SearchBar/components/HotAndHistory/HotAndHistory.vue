<template>
    <n-scrollbar style="max-height: 400px">
        <div class="hot-and-history">
            <SearchHistory v-if="searchStore.history.length" />
            <SearchHot :hot-list="hotList" />
        </div>

    </n-scrollbar>
</template>
<script lang='ts' setup>
// 组件
import SearchHistory from '../SearchHistory/SearchHistory.vue'
import SearchHot from '../SearchHot/SearchHot.vue'
// 接口
import { HotItem } from '@/api/Search/interfaces';
// 钩子
import useSearchStore from '@/store/search'


// 自定义属性 热搜列表
const props = defineProps<{ hotList: HotItem[] }>()

const searchStore = useSearchStore()

</script>
<style scoped>
.hot-and-history {
    height: 400px;
    box-sizing: border-box;
    padding:10px 5px;
}
</style>