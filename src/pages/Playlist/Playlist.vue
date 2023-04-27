<template>
    <div class="page page-layout">
        <div class="music-infor">
            <img :src="playlistInfor?.coverImgUrl">
            <div class="infor">
                <n-h2>歌单简介</n-h2>
                <n-text>{{ playlistInfor?.description||'无' }}</n-text>
            </div>
        </div>
        <div class="list">
            <ul>
                <SongItem v-for="item in songs" :key="item.id" :song="item" />
            </ul>
        </div>
    </div>
</template>
<script lang='ts' setup>
// 接口
import { Song } from '@/api/public/indexfaces';
import type { PlaylistInfor, PlaylistDynamicRes } from '@/api/Playlist/interfaces';
// api
import { getPlaylistInfor, getPlaylistDynamic, getPlaylistSong } from '@/api/Playlist';
// 钩子
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, reactive, watch } from 'vue';
// 工具函数
import { checkPage } from '@/utils/tools'
import message from '@/utils/message';

// 歌曲的详情信息
const playlistInfor = ref<PlaylistInfor | null>(null)
// 歌曲的动态信息
const playlistDynamic = ref<PlaylistDynamicRes | null>(null)
// 歌曲列表
const songs = reactive<Song[]>([])
// 正在加载
const isLoading = ref(false)
// 当前是第x页
const page = ref(0)
// 一共多少页
const pages = ref(0)

const $router = useRouter()
const $route = useRoute()

// 初始化时,加载歌单基本数据
onMounted(async () => {
    isLoading.value = true
    try {
        // 加载歌单详情数据
        const resInfor = await getPlaylistInfor(+$route.params.id)
        resInfor.code !== 200 ? Promise.reject() : ''
        playlistInfor.value = resInfor.playlist
        // 加载歌单动态数据
        const resDynamic = await getPlaylistDynamic(+$route.params.id)
        resDynamic.code !== 200 ? Promise.reject() : ''
        playlistDynamic.value = resDynamic
        // 更新页码,获取歌单当前页的歌曲
        // page.value = checkPage($route.query.page as any);
        isLoading.value = false
    } catch (error) {
        message("加载歌单失败 😰", "error")
    }
})


/**
 * 获取某一页的歌曲
 */
async function getSong() {
    isLoading.value = true
    try {
        const res = await getPlaylistSong(+$route.params.id, page.value)
        res.code !== 200 ? Promise.reject() : ''
        res.songs.forEach((ele,index) => {
            songs.push({...ele,privilege:{...res.privileges[index]}})
        })
        isLoading.value = false
    } catch (error) {
        message("加载歌单的歌曲失败 😓", "error")
    }
}


// 监听页数的变化,发送请求获取数据
watch(page, (v, o) => {
    if (v === o) {
        return
    }
    $router.push({
        path: $route.path,
        query: {
            page: v
        }
    })
})

// 路由变化就发送请求获取数据
watch(() => $route.fullPath, () => {
    // 更新页码,获取歌单当前页的歌曲
    page.value = checkPage($route.query.page as any);
    getSong()
}, { immediate: true })

</script>
<style scoped>

</style>