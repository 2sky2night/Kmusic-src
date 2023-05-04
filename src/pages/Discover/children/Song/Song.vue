<template>
    <ul class="song-list" v-if="!isLoading">
        <SongItem v-for="song in songsPage" :key="song.id" :song="song" />
        <div class="pagination" v-if="songsPage.length">
            <n-pagination  :page-slot="6" v-model:page="page" v-model:page-size="limit" show-size-picker :page-sizes="pageSizes"
              :item-count="songs.length" />
        </div>
        <EmptyPage v-else description="这一页没有数据哦 😎" :show-btn="false" />
    </ul>
    <SongItemSkeletonList :length="20" v-else />
</template>
<script lang='ts' setup>
// api
import { getRecSongs } from '@/api/Discover/Music';
import { getSongs } from '@/api/ArtistSongs';
// 接口
import { Song } from '@/api/public/indexfaces';
// 工具函数
import message from '@/utils/message';
import { checkPage } from '@/utils/tools';
// 钩子 
import { ref, reactive, onMounted, computed,watch } from 'vue'
import { onBeforeRouteUpdate, useRoute,useRouter } from 'vue-router'

const $router=useRouter()
// 路由信息
const $route = useRoute()
// 正在加载
const isLoading = ref(true)
// 歌曲列表
const songs = reactive<Song[]>([])
// 当前第几页
const page = ref($route.query.page?checkPage(+$route.query.page):1)
// 每页多少歌曲
const limit = ref(10)
// 某一页的歌曲
const songsPage = computed(() => {
    const start = (page.value - 1) * limit.value
    return songs.slice(start, start + limit.value)
})
// 分页数据配置项
const pageSizes = [
    {
        label: '10 每页',
        value: 10
    },
    {
        label: '20 每页',
        value: 20
    },
    {
        label: '30 每页',
        value: 30
    },
    {
        label: '50 每页',
        value: 50
    }
]

onMounted(async () => {
    try {
        // 获取新音乐
        const resRec = await getRecSongs()
        if (resRec.code !== 200) await Promise.reject()
        // 获取歌曲列表的详情数据
        const resSongs = await getSongs(resRec.result.map(ele => ele.song.id))
        if (resSongs.code !== 200) await Promise.reject()
        resSongs.songs.forEach(ele => {
            songs.push({ ...ele, privilege: resSongs.privileges[0] })
        })
        isLoading.value = false
    } catch (error) {
        message("获取新音乐失败 😪", "warning")
    }
})

watch(page, (v) => {
    $router.push({
        path: $route.path,
        query: {
            page:v
        }
    })
})

onBeforeRouteUpdate(to => {
    page.value=+(to.query as any).page
})

</script>
<style scoped>
.song-list {
    display: flex;
    flex-direction: column;
}
</style>