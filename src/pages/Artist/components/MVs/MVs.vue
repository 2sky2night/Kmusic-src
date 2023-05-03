<template>
    <div class="artist-mvs">
        <div class="music-list">
            <ul>
                <MvCard v-for="item in list" :key="item.id" :cover-url="item.imgurl" :durationms="item.duration"
                    :play-time="item.playCount" :title="item.name" :vid="item.id"
                    :creators="[{ userId: item.artist.id, userName: item.artistName }]" />
            </ul>
            <n-button style="align-self: center;padding: 0 80px;" strong secondary v-if="hasMore && !isLoading"
                @click="getData">加载更多</n-button>
        </div>
        <EmptyPage v-if="!isLoading && !list.length" description="该歌手没有发布mv哟 😋" :show-btn="false" />
    </div>
</template>
<script lang='ts' setup>
// 钩子
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router';
// 接口
import { MvData } from '@/api/Artist/interfaces';
// api
import { getArtistMv } from '@/api/Artist';
// 工具函数
import message from '@/utils/message';

const $route = useRoute()
// mv列表
const list = reactive<MvData[]>([])
// 正在加载
const isLoading = ref(false)
// 还有更多吗
const hasMore = ref(false)

onMounted(getData)

async function getData() {
    isLoading.value = true
    try {
        const res = await getArtistMv(+$route.params.id, list.length)
        if (res.code !== 200) await Promise.reject()
        res.mvs.forEach(ele => {
            list.push(ele)
        })
        hasMore.value = res.hasMore
        isLoading.value = false

    } catch (error) {
        message("获取歌手mv失败 🤤", "warning")
    }
}

</script>
<style scoped></style>