<template>
    <n-layout style="height: 100vh">
        <n-layout-header style="height: 60px;" bordered>
            <Header />
        </n-layout-header>
        <n-layout position="absolute" style="top: 60px; bottom: 60px;" has-sider>
            <n-layout :native-scrollbar="false" style="background-color:var(--main-bg-color);">
                <Main />
            </n-layout>
        </n-layout>
        <n-layout-footer position="absolute" style="height: 60px;" bordered>
            音乐播放器
        </n-layout-footer>
    </n-layout>
</template>
<script lang='ts' setup>
import Main from './Main/Main.vue';
import Header from './Header/Header.vue';
// 给window挂载全局消息组件函数
import { useMessage } from 'naive-ui';
(window as any).$message = useMessage()
</script>
<style scoped lang="scss"></style>