<template>
    <teleport to="body">
        <div>
            <AudioPlayer :option="{
                src, title, coverImage
            }" />
        </div>

    </teleport>
</template>
<script lang='ts' setup>
import AudioPlayer from 'vue3-audio-player'
import 'vue3-audio-player/dist/style.css'
const props = defineProps<{
    src: string;
    title: string;
    coverImage: string
}>()
</script>
<style scoped>
div {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 500px;
    background-color: red;
}
</style>