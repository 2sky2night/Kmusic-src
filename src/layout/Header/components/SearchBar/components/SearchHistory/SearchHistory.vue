<template>
    <div class="search-history">
        <div class="title">
            <n-icon style="position: relative;top:5px;margin-right: 2px;" size="20">
                <ClockCircleOutlined />
            </n-icon>
            <span>搜索的历史记录</span>
        </div>
        <ul>
            <li v-for="item in history" :key="item.time">
                <n-tag style="cursor: pointer;" @click="() => toSearch(item.name)" size="small" :bordered="false" closable
                    round @close="() => DeleteHistory(item.time)">
                    {{ item.name }}
                </n-tag>
            </li>
        </ul>
    </div>
</template>
<script lang='ts' setup>
// 钩子
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
// 仓库
import useSearchStore from '@/store/search'
// 图标
import { ClockCircleOutlined } from '@vicons/antd'

// 路由对象
const $router = useRouter()
// 搜索仓库
const searchStore = useSearchStore()
// 历史记录
const { history } = storeToRefs(searchStore)

// 删除历史记录的回调
function DeleteHistory(time: number) {
    searchStore.deleteHistory(time)
}

// 根据历史记录进行搜索 更新历史记录 进入搜索页面
function toSearch(name: string) {
    searchStore.keywords = name;
    searchStore.addHistory(name, Date.now())
    $router.push(`/search/song?keywords=${name}&page=1`)
}

</script>
<style scoped lang="scss">
.search-history {
    padding: 0 10px;
    margin-bottom: 10px;

    ul {
        display: flex;
        flex-wrap: wrap;

        li {
            margin-right: 5px;
            margin-bottom: 5px;
        }
    }
}

.title {
    color: red;
    margin-bottom: 10px;
}
</style>