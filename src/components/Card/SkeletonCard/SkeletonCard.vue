<template>
    <li :class="`skeleton-card ${textCenter ? 'center' : ''}`">
        <n-skeleton :style="{ width: '80%', borderRadius: coverRadius + '%', height: '80%' }" />
        <n-skeleton style="margin-top: 10px;width: 80%;" />
        <n-skeleton :style="{marginTop: '5px',width: '30%',alignSelf: textCenter?'center':'start',marginLeft: textCenter?'0':'10%'}" />
    </li>
</template>
<script lang='ts' setup>
//  歌曲 歌单 mv 歌手 的骨架项目
const props = defineProps<{ coverRadius: number; textCenter: boolean }>()
</script>
<style scoped>
.skeleton-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 25vh;
    align-items: center;
}
</style>