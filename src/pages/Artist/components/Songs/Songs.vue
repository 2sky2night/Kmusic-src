<template>
    <div class="hot-songs">
        <ul v-if="!isLoading">
            <SongList  :song-list="songs"  />
            <n-button v-if="songs.length" style="margin:10px 0;align-self: center;padding: 0 50px;" strong secondary
                @click="goToArtistSongs">查看歌手的全部歌曲</n-button>
        </ul>
        <SongItemSkeletonList v-else :length="10" />
        <EmptyPage v-if="!isLoading && !songs.length" description="该歌手无热门歌曲 🥰" :show-btn="false" />
    </div>
</template>
<script lang='ts' setup>
// 接口
import { Song } from '@/api/public/indexfaces';
// api 
import { getArtistHotSong } from '@/api/Artist';
// 钩子
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
// 工具函数
import message from '@/utils/message';

const $router = useRouter()
const $route = useRoute()
// 正在加载
const isLoading = ref(true)
// 热歌列表
const songs = reactive<Song[]>([])
// 自定义属性,将是否收藏歌手的信息发送给父组件
const emit = defineEmits<{
    (e: "subState", value: boolean): void
}>()

onMounted(() => {
    getHotSong(+$route.params.id)
})

/**
 * 获取歌手热门歌曲
 * @param id - 歌手id
 */
async function getHotSong(id: number) {
    isLoading.value = true
    // 清空当前歌手歌曲数据
    songs.splice(0, songs.length)
    try {
        const res = await getArtistHotSong(id)
        if (res.code !== 200) await Promise.reject()
        res.hotSongs.forEach(ele => {
            songs.push(ele)
        })
        // 将是否关注了歌手的信息发送出去
        emit("subState", res.artist.followed)
        isLoading.value = false
    } catch (error) {
        message("获取歌手热门单曲失败 😐", "warning")
    }
}

/**
 * 前往歌手全部歌曲
 */
function goToArtistSongs() {
    $router.push(`/artist-songs/${$route.params.id}?page=1`)
}

/**
 * 路由动态参数更新时获取最新的歌曲信息
 */
onBeforeRouteUpdate((to) => {
    getHotSong(+to.params.id)
})

</script>

<style scoped lang="scss">
.hot-songs ul {
    display: flex;
    flex-direction: column;
}
</style>