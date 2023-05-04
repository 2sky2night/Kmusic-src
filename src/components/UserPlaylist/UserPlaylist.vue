<template>
    <div class="music-list" style="margin: 0;">
        <TitleHeader title="收藏的歌单" />
        <EmptyPage v-if="playlist.length === 0 && !isLoading" description="没有歌单哟 😍" :show-btn="false" />
        <ul v-if="!isLoading" style="padding:0 5px;">
            <PlayListCard v-for="item in playlist" :key="item.id" :cover-img-url="item.coverImgUrl" :id="item.id"
                :name="item.name" :play-count="item.playCount" />
        </ul>
        <SkeletonList :text-center="false" :cover-radius="8" :length="10" v-if="isLoading" />
        <n-button v-if="hasMore && !isLoading" class="more-btn" @click="toGetUserPlayList">点击加载更多</n-button>
    </div>
</template>
<script lang='ts' setup>
import TitleHeader from '@/pages/Home/components/TitleHeader/TitleHeader.vue'
import message from '@/utils/message';
import { Playlist } from '@/api/public/indexfaces';
import { reactive, ref, onMounted } from 'vue'
import { getUserPlayList } from '@/api/public/user';

// 自定义属性获取需要加载的用户歌单
const props = defineProps<{ uid: number }>()

// 歌单列表
const playlist = reactive<Playlist[]>([])
// 加载完毕了吗?
const hasMore = ref(false)
// 正在加载?
const isLoading = ref(true)

/**
 * 获取歌单数据(默认加载11条)
 */
async function toGetUserPlayList() {
    isLoading.value = true
    try {
        const res = await getUserPlayList(props.uid, playlist.length, 11)
        if (res.code !== 200) await Promise.reject()
        hasMore.value = Boolean(res.playlist.length)
        res.playlist.forEach(ele => {
            playlist.push(ele)
        })
        isLoading.value=false
    } catch (error) {
        message("获取用户歌单失败 🥱","warning")
    }
}

onMounted(toGetUserPlayList)

</script>
<style scoped>
.more-btn {
    align-self: center;
    width: 80%;
    margin-bottom: 10px;
}
</style>