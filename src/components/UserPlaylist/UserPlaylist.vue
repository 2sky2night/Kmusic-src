<template>
    <div class="music-list" style="margin: 0 10px;">
        <TitleHeader title="收藏的歌单" />
        <EmptyPage v-if="playlist.length === 0 && !isLoading" description="没有歌单哟 😍" :show-btn="false" />
        <ul style="padding:0 10px;">
            <PlayListCard v-for="item in playlist" :key="item.id" :cover-img-url="item.coverImgUrl" :id="item.id"
                :name="item.name" :play-count="item.playCount" />
        </ul>
        <SkeletonList :text-center="false" :cover-radius="8" :length="10" v-if="isFirstLoading" />
        <n-button strong secondary v-if="hasMore" :loading="isLoading" class="more-btn"
            @click="toGetUserPlayList">点击加载更多</n-button>
    </div>
</template>
<script lang='ts' setup>
// 组件
import TitleHeader from '@/pages/Home/components/TitleHeader/TitleHeader.vue'
// 工具函数
import message from '@/utils/message';
// 接口
import { Playlist } from '@/api/public/indexfaces';
// 钩子
import { reactive, ref, onMounted, watch } from 'vue'
// api
import { getUserPlayList } from '@/api/public/user';

// 自定义属性获取需要加载的用户歌单
const props = defineProps<{ uid: number }>()

// 歌单列表
const playlist = reactive<Playlist[]>([])
// 加载完毕了吗?
const hasMore = ref(false)
// 正在加载?
const isLoading = ref(true)
// 首次加载
const isFirstLoading = ref(true)

/**
 * 获取歌单数据(默认加载12条)
 */
async function toGetUserPlayList() {
    isLoading.value = true
    try {
        const res = await getUserPlayList(props.uid, playlist.length, 12)
        if (res.code !== 200) await Promise.reject()
        hasMore.value = res.more
        res.playlist.forEach(ele => {
            playlist.push(ele)
        })
        isLoading.value = false
    } catch (error) {
        message("获取用户歌单失败 🥱", "warning")
    }
}

onMounted(async () => {
    await toGetUserPlayList()
    isFirstLoading.value = false
})

/**
 * 传入的id更新重新获取歌单数据
 */
watch(() => props.uid, () => {
    playlist.length = 0
    toGetUserPlayList()
})

</script>
<style scoped>
.more-btn {
    align-self: center;
    margin-bottom: 10px;
}
</style>