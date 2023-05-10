<template>
    <div class="page">
        <div v-if="!isLoading">
            <n-h1>歌单评论区</n-h1>
            <!--评论的介绍信息-->
            <div class="comment-infor">
                <!--评论的封面-->
                <div class="cover">
                    <img :src="playlist?.coverImgUrl">
                </div>
                <div class="infor-data">
                    <!--评论的标题-->
                    <div class="infor-title">
                        <n-ellipsis :line-clamp="2" class="text" style="font-size: 18px;">
                            <span @click="goToPlaylist"> {{ playlist?.name }}</span>
                        </n-ellipsis>
                    </div>
                    <!--评论的其他信息-->
                    <div class="infor-more">
                        <span style="font-size: 14px;">创建者:</span>
                        <span @click="goToUser" class="text">{{ playlist?.creator.nickname }}</span>
                    </div>
                </div>
            </div>
            <!--评论区-->
            <Comment :type="2" :get-data="getPlaylistCmt" :id="(playlist as PlaylistInfor).id" />
        </div>
    </div>
</template>
<script lang='ts' setup>
// 接口
import type { PlaylistInfor } from '@/api/Playlist/interfaces';
// 钩子
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue'
// api
import { getPlaylistCmt } from '@/api/PlaylistCmt';
import { getPlaylistInfor } from '@/api/Playlist';
// 工具
import message from '@/utils/message';
// 组件
import Comment from '@/components/Comment/Comment.vue';
// 仓库
import useUserStore from '@/store/user';

const userStore = useUserStore()
//  专辑信息
const playlist = ref<PlaylistInfor>()
// 首次正在加载?
const isLoading = ref(true)

const $router = useRouter()
const $route = useRoute()


onMounted(() => {
    getData(+$route.params.id)
})

/**
 * 去歌单页面
 */
function goToPlaylist() {
    $router.push(`/playlist/${playlist.value?.id}`)
}

/**
 * 去用户页面
 */
function goToUser() {
    if (userStore.userData.id === playlist.value?.userId) {
        $router.push(`/my`)
    } else {
        $router.push(`/user/${playlist.value?.userId}`)
    }
}

/**
 * 获取歌单信息
 * @param id 
 */
async function getData(id: number) {
    try {
        const res = await getPlaylistInfor(id)
        if (res.code !== 200) await Promise.reject()
        if (!res.playlist.creator) await Promise.reject()
        playlist.value = res.playlist

        isLoading.value = false
    } catch (error) {
        message("获取歌单评论失败 🤔", "error")
        $router.replace('/404')
    }
}


onBeforeRouteUpdate((to, from) => {
    const newId = +to.params.id;
    const oldId = +from.params.id;
    if (newId !== oldId) {
        // 动态参数更新 重新获取歌单数据
        isLoading.value = true;
        getData(newId)
    }
})

</script>
<style scoped >
.page {
    padding: 20px 10px;
}
</style>