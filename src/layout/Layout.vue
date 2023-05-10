<template>
    <n-layout style="height: 100vh">
        <n-layout-header style="height: 60px;" bordered>
            <Header />
        </n-layout-header>
        <n-layout position="absolute" :style="{ top: '60px', bottom: showFooter ? '75px' : '0px' }" has-sider>
            <n-layout-content :native-scrollbar="true" style="background-color:var(--main-bg-color);" ref="contentRef">
                <Main />
                <SongDropDown />
            </n-layout-content>
        </n-layout>

            <n-layout-footer  position="absolute"
                :style="{ height: showFooter ? '75px' : '0px',transition:'.2s' }">
                <Footer @show-footer="showFooter=true" @hide-footer="showFooter=false" />
            </n-layout-footer>

    </n-layout>
</template>
<script lang='ts' setup>
// 组件
import Footer from './Footer/Footer.vue';
import SongDropDown from '@/components/SongItem/SongDropDown/SongDropDown.vue';
import Main from './Main/Main.vue';
import Header from './Header/Header.vue';
// 钩子
import { useMessage, LayoutInst } from 'naive-ui';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
// 工具函数
import PubSub from 'pubsub-js';

// 是否显示footer
const showFooter=ref(false)


// 获取路由元数据
const $route = useRoute();

// 给window挂载全局消息组件函数
(window as any).$message = useMessage();
const contentRef = ref<LayoutInst | null>(null)

// 监听路由变化,将容器滚动到顶部
watch($route, () => {
    contentRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
})
// 监听消息,将容器滚动到顶部
PubSub.subscribe('to-top', () => {
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