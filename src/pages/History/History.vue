<template>
    <div class="page">
        <n-h1 style="margin: 0;">历史歌曲</n-h1>
        <ul v-if="musicStore.history.length">
            <SongItem v-for="item in musicStore.history" :key="item.id" :song="item"/>
        </ul>
        <EmptyPage v-else description="没有历史记录呢" :show-btn="false" />
    </div>
</template>
<script lang='ts' setup>
import SongItem from '@/components/SongItem/SongItem.vue';
import useMusicStore from '@/store/music'
const musicStore = useMusicStore()
</script>
<style scoped>
.page{
    box-sizing: border-box;
    padding: 10px;
}
</style>
