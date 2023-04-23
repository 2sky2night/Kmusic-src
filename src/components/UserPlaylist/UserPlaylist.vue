<template>
    <div class="music-list">
        <ul v-if="!isLoading">
            <PlayListCard v-for="item in playlist" :key="item.id" :cover-img-url="item.coverImgUrl" :id="item.id"
                :name="item.name" :play-count="item.playCount" />
        </ul>
        <SkeletonList :length="10" v-if="isLoading"/>
        <n-button v-if="isEnd" class="more-btn" @click="getUserPlayList">点击加载更多</n-button>
    </div>
</template>
<script lang='ts' setup>
import SkeletonList from '../SkeletonList/SkeletonList.vue';
import PlayListCard from '../PlayListCard/PlayListCard.vue';
import message from '@/utils/message';
import { Playlist } from '@/api/public/indexfaces';
import { reactive, ref, onMounted } from 'vue'
import { getUserPlayList } from '@/api/public/user';

// 自定义属性获取需要加载的用户歌单
const props = defineProps<{ uid: number }>()

// 歌单列表
const playlist = reactive<Playlist[]>([])

// 加载第几页?
const page = ref(1)

// 加载完毕了吗?
const isEnd = ref(false)
// 正在加载?
const isLoading = ref(false)

/**
 * 获取歌单数据(默认加载二十条)
 */
async function toGetUserPlayList() {
    isLoading.value = true
    if (isEnd.value === false) {
        // 当前是否加载完成?
        if (page.value >= 1) {
            // 输入的参数正确
            const res = await getUserPlayList(props.uid, page.value)
            if (res.code === 200) {
                // 设置是否还有更多数据
                isEnd.value = res.more
                // 保存数据
                res.playlist.forEach(ele => {
                    playlist.push(ele)
                })
                if (!isEnd.value) {
                    message('没有更多了 😴', "warning")
                }
                // 页数+1
                page.value++
            }
        } else {
            // 参数错误
            message('参数错误!😋', "warning")
        }
    } else {
        // 若已经加载完成了
        message('没有更多了!', "warning")
    }
    isLoading.value = false
}

onMounted(() => {
    toGetUserPlayList()
})

</script>
<style scoped>
.more-btn {
    align-self: center;
    width: 80%;
    margin-bottom: 10px;
}
</style>