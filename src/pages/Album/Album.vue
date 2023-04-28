<template>
    <div class="page page-layout">
        <PlaylistSkeleton v-if="isLoading" />
        <div class="music-infor" v-if="!isLoading">
            <div class="cover">
                <Cover :img="(album as AlbumMore).picUrl" />
            </div>
            <div class="infor">
                <h1>{{ (album as AlbumMore).name }}</h1>
                <n-h2>专辑简介</n-h2>
                <div class="desc">
                    <n-ellipsis style="width:250px;" :line-clamp="4" :tooltip="false" ref="textClip">
                        {{ (album as AlbumMore).description || '无' }}
                    </n-ellipsis>
                    <span style="width: 250px;visibility: hidden;position: absolute;" ref="text">
                        {{ (album as AlbumMore).description || '无' }}
                    </span>
                    <n-button @click="messageboxWithout((album as AlbumMore).description, '歌单简介')"
                        style="width: 100%;margin-bottom: 10px;" strong secondary v-if="checkDescShow">
                        全部简介
                    </n-button>
                
                </div>
                <div class="list-title">

                    <div class="list-time">
                        <n-button strong secondary size="small" class="check-desc" v-if="(album as AlbumMore).description"
                            @click="messageboxWithout((album as AlbumMore).description, '歌单简介')">
                            查看简介
                        </n-button>
                        <n-button strong secondary size="small">已收藏</n-button>
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
                <span>发行公司: {{ (album as AlbumMore).company }}</span>

            </div>

            <ul style="margin-right: 10px;">
                <SongItem v-for="song in songs" :key="song.id" :song="song" />
            </ul>
        </div>
    </div>
</template>
<script lang='ts' setup>
// 钩子
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, onMounted, nextTick } from 'vue'
// 组件
import PlaylistSkeleton from '@/components/PageSkeleton/PlaylistSkeleton/PlaylistSkeleton.vue';
import Cover from '@/components/Cover/Cover.vue';
import SongItem from '@/components/SongItem/SongItem.vue';
// 接口
import { Song } from '@/api/public/indexfaces';
import { AlbumMore } from '@/api/Album/interfaces'
// api
import { getAlbumInfor, toggleSubAlbum } from '@/api/Album'
import message from '@/utils/message';
import { messageboxWithout } from '@/render/MessageBox'
// 工具函数
import { timeFormat } from '@/utils/computed';

// 简介真实容器
const text = ref<HTMLElement | null>(null)
// 歌曲简介裁剪成4行的容器
const textClip = ref<any | null>(null)
// 是否需要显示查看简介的按钮
const checkDescShow = ref(false)
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

// 获取数据
onMounted(async () => {
    try {
        const res = await getAlbumInfor(+$route.params.id)
        res.code !== 200 ? Promise.reject() : ''
        // 获取专辑歌曲数据
        res.songs.forEach(ele => {
            songs.push(ele)
        })
        // 获取专辑信息
        album.value = res.album
        // 获取收藏状态
        isSub.value = res.album.info.liked
        isLoading.value = false
        // 检测当前简介是否超过一定高度,来设置查看全部简介的按钮的显示
        nextTick(checkDes)
        // 开启窗口监听
        window.addEventListener("resize", checkDes)
    } catch (error) {
        message("获取专辑数据失败 😋", "error", () => $router.back())
    }
})

/**
 * 检测当前简介是否超过一定高度
 */
function checkDes() {
    if ((text.value as HTMLElement).clientHeight > textClip.value.$el.clientHeight) {
        checkDescShow.value = true
        console.log('裁剪后的简介和未裁剪的高度不一致,需要显示查看全部简介的按钮');
    }
}

</script>
<style scoped lang="scss">
.page {
    padding-top: 20px;
    box-sizing: border-box;

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
    button{
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
    }
}
</style>