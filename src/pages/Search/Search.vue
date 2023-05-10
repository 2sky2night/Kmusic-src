<template>
    <div class="page">
        <h1>
            <span>{{ keywordsNow ? keywordsNow : '空' }}</span>的搜索结果
        </h1>
        <n-tabs type="line" :value="$route.path" @update:value="changeTab">
            <n-tab name="/search/song">
                歌曲
            </n-tab>
            <n-tab name="/search/album">
                专辑
            </n-tab>
            <n-tab name="/search/playlist">
                歌单
            </n-tab>
            <n-tab name="/search/artist">
                歌手
            </n-tab>
            <n-tab name="/search/mv">
                视频
            </n-tab>
            <n-tab name="/search/user">
                用户
            </n-tab>
        </n-tabs>
        <RouterView></RouterView>

    </div>
</template>
<script lang='ts' setup>
// 钩子
import useSearchStore from '@/store/search';
import { storeToRefs } from 'pinia';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { ref, provide } from 'vue';
// 工具函数
import message from '@/utils/message';


// 仓库中的搜索关键词
const { keywords } = storeToRefs(useSearchStore())
// 路由实例
const $router = useRouter()
// 路由元数据
const $route = useRoute()
// 当前的搜索关键词
const keywordsNow = ref('')
// 将当前搜索的关键词注入给子组件
provide('keywordsNow', keywordsNow)


/**
 * 检查路由参数
 */
function checkQuery() {
    const keywordsQuery = $route.query.keywords
    if (!keywords.value && keywordsQuery) {
        // 若携带有查询参数且仓库中keyword的值为空 (通过url直接加载的本页面) 则更新仓库的数据源
        keywords.value = keywordsQuery + ''
    } else if (!keywords.value && !keywordsQuery) {
        // 若未携带参数且仓库中keywords值为空则说明未带参数进入了该页面
        message("未携带查询参数 💀", "info")
        $router.replace('/')
    }
    keywordsNow.value = keywords.value;
}

checkQuery()

/**
 * 切换搜索类别 重置查询参数page
 * @param path 
 */
function changeTab(path: string) {
    $router.replace({
        path,
        query: {
            keywords: keywordsNow.value,
            page: 1
        }
    })

}

onBeforeRouteUpdate(to => {
    if (to.query.keywords) {
        // 携带有参数
        keywordsNow.value = to.query.keywords + ''
    } else {
        // 若未携带参数
        message("未携带查询参数 💀", "info")
        $router.replace('/')
    }
})

</script>
<style scoped lang="scss">
.page {
    box-sizing: border-box;
    padding: 10px;
    padding-top: 50px;
}

h1 {
    font-size: 20px;

    span {
        font-size: 50px;
        margin-right: 20px;
    }
}

@media screen and (max-width:600px) {
    .page {
        padding-top: 10px;
    }

    h1 {
        font-size: 15px;

        span {
            font-size: 30px;
            margin-right: 5px;
        }
    }
}
</style>