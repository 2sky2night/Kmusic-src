<template>
    <div ref="artRef" class="video-area">

    </div>
</template>

<script lang="ts" setup>
import Artplayer from "artplayer";
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

// 播放器实例
let instance: any = null
// 播放器容器
const artRef = ref<HTMLDivElement | null>(null)

// 自定义事件
const emit = defineEmits<{
    (e: "get-instance", instance: any): void
}>()

// 自定义属性
const props = defineProps<{
    option: {
        /**
         * 视频的url地址
         */
        url: string;
        /**
         * 视频未播放前的封面
         */
        poster: string;
        title: string;
        /**
         * 自定义设置栏
         */
        settings: any[],
        /**
         * 画质列表
         */
        // quality: any[]
    }
}>()

// 组件挂载时需要做的事情
onMounted(() => {
    instance = new Artplayer({
        ...props.option,
        container: (artRef.value as HTMLDivElement),
        autoMini: true,
        setting: true,
        flip: true,
        playbackRate: true,
        aspectRatio: true,
        fullscreen: true,
        theme: '#4098fc',
        lock: true,
        hotkey: true
    })
    // 视频挂载完成时通知父组件获取播放器实例
    nextTick(() => {
        emit("get-instance", instance);
    });
})

// 组件卸载时销毁视频容器
onUnmounted(() => {
    if (instance && instance.destroy) {
        instance.destroy(false);
    }
})

</script>
<style>
.video-area {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
}
</style>