<template>
    <div class="page">
        <h1>发现</h1>
        <n-tabs type="segment" @update:value="tabChange" :value="$route.path">
            <n-tab name="/discover/playlist">
                歌单
            </n-tab>
            <n-tab name="/discover/song">
                歌曲
            </n-tab>
            <n-tab name="/discover/artist">
                歌手
            </n-tab>
        </n-tabs>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>
<script lang='ts' setup>
import { useRoute, useRouter } from 'vue-router';

// 路由信息
const $route = useRoute()
// 路由对象
const $router = useRouter()

function tabChange(v: string) {
    $router.push(v)
}
</script>
<style scoped lang="scss">
.page {
    box-sizing: border-box;
    padding: 10px;
    padding-top: 20px;
}

h1 {
    font-size: 40px;
    margin-bottom: 10px;
}
</style>