<template>
    <div class="hot-songs">
        <ul v-if="!isLoading">
            <SongItem v-for="item in songs" :key="item.id" :song="item" />
            <n-button  style="align-self: center;padding: 0 50px;" strong secondary @click="goToArtistSongs">查看歌手的全部歌曲</n-button>
        </ul>
        <SongItemSkeletonList v-else :length="10" />
    </div>
</template>
<script lang='ts' setup>
// 接口
import { Song } from '@/api/public/indexfaces';
// api 
import { getArtistHotSong } from '@/api/Artist';
// 钩子
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
// 工具函数
import message from '@/utils/message';
import SongItem from '@/components/SongItem/SongItem.vue';
import SongItemSkeletonList from '@/components/SkeletonList/SongItemSkeletonList/SongItemSkeletonList.vue';

const $router = useRouter()
const $route = useRoute()
// 正在加载
const isLoading = ref(true)
// 热歌列表
const songs = reactive<Song[]>([])


onMounted(async () => {
    try {
        const res = await getArtistHotSong(+$route.params.id)
        if (res.code !== 200) await Promise.reject()
        res.hotSongs.forEach(ele => {
            songs.push(ele)
        })
        isLoading.value = false
    } catch (error) {
        message("获取歌手热门单曲失败 😐", "warning")
    }
})

function goToArtistSongs() {
    $router.push(`/artist-songs/${$route.params.id}?page=1`)
}

</script>

<style scoped lang="scss">
.hot-songs ul{
    display: flex;
    flex-direction: column;
}
</style>