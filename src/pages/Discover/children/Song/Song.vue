<template>
    <ul v-if="!isLoading">
        <SongItem v-for="song in songs" :key="song.id"
            :song="song"
        />
    </ul>
    <SongItemSkeletonList :length="20" v-else />
</template>
<script lang='ts' setup>
// api
import { getRecSongs } from '@/api/Discover/Music';
import { getSongs } from '@/api/ArtistSongs';
// 接口
import { Song } from '@/api/public/indexfaces';
// 组件
import SongItem from '@/components/SongItem/SongItem.vue';
import SongItemSkeletonList from '@/components/SkeletonList/SongItemSkeletonList/SongItemSkeletonList.vue';
// 工具函数
import message from '@/utils/message';
// 钩子 
import { ref, reactive, onMounted } from 'vue'

// 正在加载
const isLoading = ref(true)
// 歌曲列表
const songs = reactive<Song[]>([])

onMounted(async () => {
    try {
        // 获取新音乐
        const resRec = await getRecSongs()
        if (resRec.code !== 200) await Promise.reject()
        // 获取歌曲列表的详情数据
        const resSongs = await getSongs(resRec.result.map(ele => ele.song.id))
        if (resSongs.code !== 200) await Promise.reject()
        resSongs.songs.forEach(ele => {
            songs.push({...ele,privilege:resSongs.privileges[0]})
        })
        isLoading.value = false
    } catch (error) {
        message("获取新音乐失败 😪", "warning")
    }
})

</script>
<style scoped></style>