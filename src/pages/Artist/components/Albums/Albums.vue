<template>
    <div class="artist-albums">
        <div class="music-list">
            <ul>
                <AlbumCard v-for="item in list" :key="item.id" :artists="item.artists" :id="item.id" :name="item.name"
                    :pic-url="item.picUrl" :sub-time="(item.publishTime as number)"></AlbumCard>
            </ul>
        </div>
        <n-button style="align-self: center;padding: 0 80px;" strong secondary v-if="hasMore && !isLoading" @click="getData">加载更多</n-button>
        <EmptyPage v-if="!isLoading&&!list.length" description="该歌手没有发布专辑哟 😋" :show-btn="false" />
    </div>
</template>
<script lang='ts' setup>
// api
import { getArtistAlbum } from '@/api/Artist';
// 接口
import { Album } from '@/api/public/indexfaces';
// 钩子
import { useRoute } from 'vue-router'
import { onMounted, reactive, ref } from 'vue';
import message from '@/utils/message';
import EmptyPage from '@/components/EmptyPage/EmptyPage.vue';
const $route = useRoute()
// 专辑列表
const list = reactive<Album[]>([])
// 还有更多吗
const hasMore = ref(false)
// 正在加载
const isLoading = ref(false)

onMounted(getData)

// 获取歌手专辑列表
async function getData() {
    isLoading.value = true
    try {
        const res = await getArtistAlbum(+$route.params.id, list.length)
        if (res.code !== 200) await Promise.reject()
        res.hotAlbums.forEach(ele => {
            list.push(ele)
        })
        hasMore.value = res.more
        isLoading.value = false
    } catch (error) {
        message("获取歌手专辑失败 😲", "warning")
    }
}

</script>
<style scoped>
.artist-albums{
    display: flex;
    flex-direction: column;
}
</style>