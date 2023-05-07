<template>
    <div class="page">
        <div v-if="!isLoading">
            <n-h1>专辑评论区</n-h1>
            <!--评论的介绍信息-->
            <div class="comment-infor">
                <!--评论的封面-->
                <div class="cover">
                    <img :src="album?.picUrl">
                </div>
                <div class="infor-data">
                    <!--评论的标题-->
                    <div class="infor-title">
                        <n-ellipsis :line-clamp="2" class="text" style="font-size: 18px;">
                            <span @click="goToAlbum"> {{ album?.name }}</span>
                        </n-ellipsis>
                    </div>
                    <!--评论的其他信息-->
                    <div class="infor-more">
                        <n-ellipsis :line-clamp="1" @click="goToAlbum" style="font-size: 18px;">
                            <span style="font-size: 14px;">歌手: </span>
                            <span @click="goToArtist(item.id)" v-for="item in album?.artists" :key="item.id" class="text"
                                style="margin-right: 5px;font-size: 14px;">{{ item.name }}</span>
                        </n-ellipsis>

                    </div>
                </div>
            </div>
            <!--评论区-->
            <Comment :type="3" :get-data="getAlbumCmt" :id="(album as Album).id" />
        </div>
    </div>
</template>
<script lang='ts' setup>
// 接口
import type { Album } from '@/api/public/indexfaces';
// 钩子
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue'
// api
import { getAlbumCmt } from '@/api/AlbumCmt';
import { getAlbumInfor } from '@/api/Album';
// 工具
import message from '@/utils/message';
// 组件
import Comment from '@/components/Comment/Comment.vue';

//  专辑信息
const album = ref<Album>()
// 首次正在加载?
const isLoading = ref(true)

const $router = useRouter()
const $route = useRoute()


onMounted(() => {
    getData(+$route.params.id)
})

async function getData(id: number) {
    try {
        // 获取专辑信息
        const res = await getAlbumInfor(id)
        if (res.code !== 200) await Promise.reject()
        album.value = res.album

        isLoading.value = false
    } catch (error) {
        message("获取专辑评论失败 🤔", "error")
        $router.replace('/404')
    }
}

/**
 * 去专辑页面
 */
function goToAlbum() {
    $router.push(`/album/${album.value?.id}`)
}

/**
 * 去歌手页面
 */
function goToArtist(id: number) {
    $router.push(`/artist/${id}`)
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