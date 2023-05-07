<template>
    <div class="page">
        <div v-if="!isLoading">
            <n-h1>歌曲评论区</n-h1>
            <!--评论的介绍信息-->
            <div class="comment-infor">
                <!--评论的封面-->
                <div class="cover">
                    <img :src="song?.al.picUrl">
                </div>
                <div class="infor-data">
                    <!--评论的标题-->
                    <div class="infor-title">
                        <n-h2 @click="goToSong" class="text" style="font-size: 20px;display: inline-block;margin: 0;">
                            <span> {{ song?.name }}</span>
                            <span v-if="song?.tns" style="font-size: 12px;"> ({{ song.tns[0] }})</span>
                        </n-h2>
                    </div>
                    <!--评论的其他信息-->
                    <div class="infor-more">
                        <span>歌手: </span>
                        <span @click="goToArtist(item.id)" v-for="item in song?.ar" :key="item.id" class="text"
                            style="margin-right: 5px;font-size: 14px;">{{ item.name }}</span>
                    </div>
                </div>
            </div>
            <!--评论区-->
            <Comment :type="0" :get-data="getSongComment" :id="(song as Song).id" />
        </div>

    </div>
</template>
<script lang='ts' setup>
// 接口
import type { Song } from '@/api/public/indexfaces';
// 钩子
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue'
// api
import { getSongComment } from '@/api/SongCmt';
import { getSongInfor } from '@/api/Song';
// 工具
import message from '@/utils/message';
// 组件
import Comment from '@/components/Comment/Comment.vue';

//  歌曲信息
const song = ref<Song>()
// 首次正在加载?
const isLoading = ref(true)

const $router = useRouter()
const $route = useRoute()


onMounted(() => {
    getData(+$route.params.id)
})

/**
 * 去歌曲页面
 */
function goToSong() {
    $router.push(`/song/${song.value?.id}`)
}

/**
 * 去歌手页面
 */
function goToArtist(id: number) {
    $router.push(`/artist/${id}`)
}

/**
 * 获取评论信息
 * @param id 
 */
async function getData(id: number) {
    try {
        // 获取歌曲信息
        const resSong = await getSongInfor(id)
        if (resSong.code !== 200) await Promise.reject()
        if (resSong.songs.length) {
            song.value = resSong.songs[0]
        } else {
            await Promise.reject()
        }
        isLoading.value = false
    } catch (error) {
        message("获取歌曲评论失败 🤔", "error")
        $router.replace('/404')
    }
}

// 路由动态参数更新时重新获取歌曲数据
onBeforeRouteUpdate(async (to, from) => {

    const newId = +to.params.id;
    const oldId = +from.params.id;
    if (newId !== oldId) {
        isLoading.value = true;
        await getData(+to.params.id)
    }

})

</script>
<style scoped>
.page {
    padding: 20px 10px;
}
</style>