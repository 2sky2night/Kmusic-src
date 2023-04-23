<template>
    <n-layout style="height: 100vh">
        <n-layout-header style="height: 60px;" bordered>
            <Header />
        </n-layout-header>
        <n-layout position="absolute" style="top: 60px; bottom: 60px;" has-sider>
            <n-layout-content :native-scrollbar="true" style="background-color:var(--main-bg-color);" ref="contentRef">
                <Main />
            </n-layout-content>
        </n-layout>
        <n-layout-footer position="absolute" style="height: 60px;" bordered>
            音乐播放器
        </n-layout-footer>
    </n-layout>
</template>
<script lang='ts' setup>
import Main from './Main/Main.vue';
import Header from './Header/Header.vue';
import { useMessage, LayoutInst } from 'naive-ui';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// 获取路由元数据
const $route = useRoute();

// 给window挂载全局消息组件函数
(window as any).$message = useMessage();
const contentRef = ref<LayoutInst | null>(null)

watch($route, () => {
    contentRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
<style>
/*修改滚动条赛道样式*/
.n-layout-scroll-container::-webkit-scrollbar {
    background-color: inherit;
    width: 6px;
}

/*修改滚动条样式*/
.n-layout-scroll-container::-webkit-scrollbar-thumb {
    background-color: var(--scroll-bar-color);
    border-radius: 5px;
}

.n-layout-scroll-container::-webkit-scrollbar-thumb:hover {
    background-color: var(--scroll-bar-color--hover);
}
</style>