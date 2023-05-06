<template>
    <div class="search-hot">
        <div class="title">
            <n-icon style="position: relative;top:-3px" size="20">
                <FireFilled />
            </n-icon>
            <span>热搜磅</span>
        </div>
        <ul>
            <li v-for="(item, index) in hotList" class="hot-item" :key="item.score" @click="()=> toSearch(item.searchWord)">
                <div :style="{ color: index <= 2 ? 'red' : '' }">{{ index + 1 }}</div>
                <div>
                    <div class="hot-title">
                        <span>{{ item.searchWord }}</span>
                        <n-tag round v-if="item.iconType===1" :bordered="false" size="small" type="error">
                            HOT
                        </n-tag>
                        <n-tag round v-if="item.iconType === 5" :bordered="false" size="small" type="error">
                            UP
                        </n-tag>
                    </div>
                    <n-ellipsis v-if="item.content" style="max-width: 180px;font-size: 12px;color:var(--text-dark)" :tooltip="false">
                        {{ item.content }}
                    </n-ellipsis>
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang='ts' setup>
// 接口
import { HotItem } from '@/api/Search/interfaces';
// 图标
import { FireFilled } from '@vicons/antd'
// 仓库
import useSearchStore from '@/store/search';

// 搜索仓库
const searchStore=useSearchStore()
// 自定义属性 热搜列表
const props = defineProps<{ hotList: HotItem[] }>()

// 进入搜索页面,并将当前输入的内容保存到仓库中并添加一个历史记录
function toSearch(keywords: string) {
    searchStore.keywords = keywords;
    searchStore.addHistory(keywords, Date.now());
}

</script>
<style scoped lang="scss">
.search-hot {

    .title {
        margin-left: 10px;
        display: flex;
        align-items: center;
        color: rgb(255, 0, 0);
    }
}

.hot-item {
    align-items: center;
    display: flex;
    padding: 10px;
    transition: .5s;
    transition-property: background-color;
    border-radius: 10px;
    cursor: pointer;

    .hot-title {
        span {
            margin-right: 10px;
        }
    }

    >div:first-child {
        font-size: 20px;
        margin-right: 20px;
    }

    >div:last-child {
        display: flex;
        flex-direction: column;

        >div {
            display: flex;
        }

    }
}

.hot-item:hover {
    background-color: var(--hover-bg-color);
}
</style>