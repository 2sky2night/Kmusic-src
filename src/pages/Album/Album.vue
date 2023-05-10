<template>
    <div class="page page-layout">
        <PlaylistSkeleton v-if="isLoading" />
        <div class="music-infor" v-if="!isLoading">
            <div class="cover" @click="previewPhtot((album as AlbumMore).picUrl)">
                <Cover :img="(album as AlbumMore).picUrl" />
            </div>
            <div class="infor">
                <h1>{{ (album as AlbumMore).name }}</h1>
                <n-h2>专辑简介</n-h2>
                <div class="desc">
                    <n-ellipsis style="width:250px;" :line-clamp="4" :tooltip="false">
                        {{ (album as AlbumMore).description || '无' }}
                    </n-ellipsis>
                    <n-button v-if="(album as AlbumMore).description"
                        @click="messageboxWithout((album as AlbumMore).description, '歌单简介')"
                        style="width: 100%;margin-bottom: 10px;" strong secondary>
                        全部简介
                    </n-button>

                </div>
                <div class="list-title">

                    <div class="list-time">
                        <n-button strong secondary size="small" class="check-desc" v-if="(album as AlbumMore).description"
                            @click="messageboxWithout((album as AlbumMore).description, '歌单简介')">
                            查看简介
                        </n-button>
                        <n-button @click="toSubAlbum" strong secondary size="small" :type="isSub ? 'warning' : 'default'"
                            v-text="isSub ? '已收藏' : '收藏'" />
                        <n-button @click="goToComment" strong secondary size="small" type="info">
                            评论 {{ (album as AlbumMore).info.commentCount }}
                        </n-button>
                    </div>
                </div>
            </div>

        </div>
        <div class="list" v-if="!isLoading">
            <h1>{{ (album as AlbumMore).name }}</h1>
            <div>
                <span>歌手: </span>
                <span @click.stop="$router.push(`/artist/${item.id}`)" class="artist"
                    v-for="item in (album as AlbumMore).artists" :key="item.id">{{ item.name }}</span>
            </div>
            <div class="album-pub">
                <span>发行时间: {{ timeFormat((album as AlbumMore).publishTime) }}</span>
                <span>发行公司: {{ (album as AlbumMore).company || '无' }}</span>

            </div>
            <SongList style="margin-right: 10px;" :song-list="songs"  />
        </div>
    </div>
</template>
<script lang='ts' setup>
// 钩子
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'
// 组件
import PlaylistSkeleton from '@/components/PageSkeleton/PlaylistSkeleton/PlaylistSkeleton.vue';
import Cover from '@/components/Cover/Cover.vue';
// 接口
import type { Song } from '@/api/public/indexfaces';
import type { AlbumMore } from '@/api/Album/interfaces'
// api
import { getAlbumInfor, toggleSubAlbum } from '@/api/Album'
import message from '@/utils/message';
import { messageboxWithout } from '@/render/MessageBox'
// 工具函数
import { timeFormat } from '@/utils/computed';
// 仓库
import useUserStore from '@/store/user';
// 渲染函数
import previewPhtot from '@/render/PreviewPhoto';

// 正在加载
const isLoading = ref(true)
//  专辑歌曲
const songs = reactive<Song[]>([])
// 专辑信息
const album = ref<AlbumMore>()
// 是否收藏
const isSub = ref(false)
// 路由
const $route = useRoute()
const $router = useRouter()
// 用户仓库
const userStore = useUserStore()

// 获取数据
onMounted(() => {
    getData(+$route.params.id)
})


/**
 * 收藏或取消收藏专辑
 */
async function toSubAlbum() {
    if (!userStore.isLogin && !userStore.cookie) {
        return message("请登录后再进行操作 😂", "warning")
    }
    try {
        if (isSub.value) {
            // 取消收藏
            const res = await toggleSubAlbum((album.value as AlbumMore).id, 0)
            if (res.code === 200) {
                userStore.removeStarAlbum((album.value as AlbumMore).id)
                message("取消收藏专辑成功! 🤑", "success")
                isSub.value = false
            } else {
                await Promise.reject()
            }
        } else {
            //  收藏专辑
            const res = await toggleSubAlbum((album.value as AlbumMore).id, 1)
            if (res.code === 200) {
                userStore.addStarAlbum((album.value as AlbumMore).id)
                message("收藏专辑成功! 的😁", "success")
                isSub.value = true
            } else {
                await Promise.reject()
            }
        }
    } catch (error) {
        message("收藏/取消收藏专辑失败! 😪", "error")
    }
}

/**
 * 专辑评论区
 */
function goToComment() {
    $router.push(`/album-comment/${(album.value as AlbumMore).id}?page=1`)
}

async function getData(id: number) {
    isLoading.value = true
    try {
        const res = await getAlbumInfor(id)
        res.code !== 200 ? await Promise.reject() : ''
        // 获取专辑歌曲数据
        res.songs.forEach(ele => {
            songs.push(ele)
        })
        // 获取专辑信息
        album.value = res.album
        // 获取收藏状态 (根据仓库中是否收藏此专辑的id即可知道当前是否收藏过该专辑)
        isSub.value = userStore.userData.idAlbums.some(ele => ele === res.album.id)
        isLoading.value = false
    } catch (error) {
        message("获取专辑数据失败 😋", "error")
        $router.replace('/404')
    }
}

// 路由更新时,获取最新数据
onBeforeRouteUpdate(to => {
    // 清空专辑歌曲,重新获取
    songs.length = 0;
    getData(+to.params.id)
})

</script>
<style scoped lang="scss">
.page {
    padding-top: 20px;
    box-sizing: border-box;

    .list-time {
        display: flex;
        flex-direction: column;

        button {
            width: 100%;
            margin-bottom: 10px;
        }
    }

    .artist {
        position: relative;
        margin-right: 10px;
        color: var(--text-dark);
        font-size: 14px;
        cursor: pointer;
        transition: .3s;
    }

    .artist:hover {
        color: var(--color-primary);
    }

    .artist:not(:last-child)::after {
        position: absolute;
        right: -8px;
        content: '/';
        cursor: default;
    }

    .artist:hover::after {
        color: var(--text-dark);
    }

    button {
        height: 30px;
        font-size: 14px;
    }

    .album-pub {
        display: flex;

        span {
            margin-right: 10px;
        }
    }

    @media screen and (max-width:800px) {
        .album-pub {
            flex-direction: column;
        }

        .list-time {
            flex-direction: row;

            button {
                margin-right: 10px;
                width: auto;
            }
        }
    }
}
</style>