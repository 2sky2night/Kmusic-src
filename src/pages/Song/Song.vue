<template>
    <div class="page">
        <SongSkeleton v-if="isLoading" />
        <div class="song-infor" v-else>
            <div class="information">
                <!--歌曲封面-->
                <div class="song-cover">
                    <n-image :src="song?.al.picUrl" />
                </div>
                <!--歌曲名称 作者等信息-->
                <div class="song-data">
                    <h2>
                        <span>{{ song?.name }}</span>
                    </h2>
                    <div>
                        <span>歌手: </span>
                        <span @click.stop="$router.push(`/artist/${item.id}`)" class="artist" v-for="item in song?.ar"
                            :key="item.id">{{ item.name }}</span>
                    </div>
                    <div @click="goToAlbum">
                        <span style="font-size: 13px;">专辑: </span>
                        <n-ellipsis style="max-width: 300px;position: relative;top:-.5px" class="text"
                            v-text="song?.al.name" />
                    </div>
                    <!--相似歌曲推荐-->
                    <div class="simi-songs" v-if="simiSongs.length">
                        <span>相似歌曲</span>
                        <SongSortCard v-for="item in simiSongs" :song="item" :key="item.id" />
                    </div>
                    <div class="song-func">
                        <n-button @click="playMusic" size="small" strong secondary type="error">播放</n-button>
                        <n-button style="position: relative;top:3px" @click="toToggleLike" size="small" strong secondary>
                            <n-icon :color="isLike ? 'red' : ''">
                                <IosHeart v-if="isLike" />
                                <IosHeartEmpty v-else />
                            </n-icon>
                        </n-button>
                        <n-button size="small" strong secondary>添加到</n-button>
                        <n-button @click="goToComment" size="small" strong secondary type="info">评论</n-button>
                        <n-button @click="goToMv" v-if="song?.mv" size="small" strong secondary type="warning">MV</n-button>
                    </div>
                </div>

            </div>
            <div class="simi-playlist music-list">
                <!--推荐歌单-->
                <TitleHeader title="包含这首歌的歌单" />
                <ul v-if="simiPlaylist.length">
                    <PlayListCard v-for="item in simiPlaylist" :key="item.id" :cover-img-url="item.coverImgUrl"
                        :id="item.id" :name="item.name" :play-count="item.playCount" />
                </ul>
                <EmptyPage v-else description="这首歌暂时没被收藏到热门歌单过呢 😉" :show-btn="false" />
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
// 图标
import { IosHeart, IosHeartEmpty } from '@vicons/ionicons4'
// 接口
import type { Song, Privilege, Playlist } from '@/api/public/indexfaces';
import type { SongMore } from '@/api/Song/interfaces';
// api
import { getSongInfor, getSimiPlaylist, getSimiSongs } from '@/api/Song';
import { toggleLikeSong } from '@/api/public/song';
// 钩子
import { onMounted, reactive, ref, watch } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
// 工具函数
import message from '@/utils/message';
// 组件
import SongSortCard from '@/components/Card/SongSortCard/SongSortCard.vue';
import SongSkeleton from '@/components/PageSkeleton/SongSkeleton/SongSkeleton.vue'
import EmptyPage from '@/components/EmptyPage/EmptyPage.vue';
import TitleHeader from '@/pages/Home/components/TitleHeader/TitleHeader.vue';
// 仓库
import useMusicStore from '@/store/music'
import useUserStore from '@/store/user';

const userStore = useUserStore()
const musicStore = useMusicStore()

const $route = useRoute()
const $router = useRouter()
//  歌曲信息
const song = ref<Song>()
// 歌曲其他信息
const privilege = ref<Privilege>()
// 相似的歌曲
const simiSongs = reactive<SongMore[]>([])
// 包含这首歌的歌单
const simiPlaylist = reactive<Playlist[]>([])
// 是否喜欢歌曲
const isLike = ref(false)
// 正在加载
const isLoading = ref(false)
// 是否离开了当前页面
let isLeave = false

// 获取歌曲信息
async function getSongData() {
    isLoading.value = true
    try {
        // 获取歌曲信息
        const resSong = await getSongInfor(+$route.params.id)
        if (resSong.code !== 200) Promise.reject()
        song.value = resSong.songs[0]
        privilege.value = resSong.privileges[0]
        // 获取相似歌曲
        const resSimiSong = await getSimiSongs(+$route.params.id)
        if (resSimiSong.code !== 200) Promise.reject()
        resSimiSong.songs.forEach(ele => {
            simiSongs.push(ele)
        })
        // 获取包含这首歌的歌单
        const resSimiPlaylist = await getSimiPlaylist(+$route.params.id)
        if (resSimiPlaylist.code !== 200) Promise.reject()
        resSimiPlaylist.playlists.forEach(ele => {
            simiPlaylist.push(ele)
        })
        // 查看当前是否喜欢该歌曲
        isLike.value = userStore.userData.ids.some(ele => ele === (song.value as Song).id)
        isLoading.value = false
    } catch (error) {
        message("获取歌曲数据失败 🤔", "warning");
        $router.replace('/404')
    }
}

// 初始化加载页面时获取数据
onMounted(getSongData)
// 路由更新时获取更新当前页面
onBeforeRouteUpdate(() => {
    // 路由更新前先清空数据
    simiPlaylist.splice(0, simiPlaylist.length)
    simiSongs.splice(0, simiSongs.length)
})
// 路由离开时,设置离开状态,防止意外的加载数据
onBeforeRouteLeave(() => {
    isLeave = true
})

watch(() => $route.params.id, () => {
    if (isLeave) return
    getSongData()
})



// 点击播放歌曲
function playMusic() {
    musicStore.setPlayingSong({
        album: song.value?.al,
        artists: song.value?.ar,
        id: song.value?.id,
        name: song.value?.name,
        isVip: privilege.value?.freeTrialPrivilege.resConsumable
    })
}

// 点击跳转专辑页面
function goToAlbum() {
    $router.push(`/album/${song.value?.al.id}`)
}
/**
 * 去歌曲评论区
 */
function goToComment() {
    $router.push(`/song-comment/${song.value?.id}?page=1`)
}

/**
 * 喜欢/取消喜欢歌曲
 */
async function toToggleLike() {
    if (!userStore.isLogin && !userStore.cookie) {
        return message("请登录后再进行操作 😂", "warning")
    }
    const id = (song.value as Song).id
    try {
        if (isLike.value) {
            const res = await toggleLikeSong(id, false)
            res.code !== 200 ? Promise.reject() : ''
            isLike.value = false
            message("取消喜欢音乐成功 😃", "success")
            userStore.removeSongLike(id)
        } else {
            const res = await toggleLikeSong(id, true)
            res.code !== 200 ? Promise.reject() : ''
            isLike.value = true
            message("喜欢音乐成功 😃", "success")
            userStore.setSongLikeList(id)
        }
    } catch (error) {
        message("喜欢/取消喜欢音乐失败 🙄", "warning")
    }

}

/**
 * 去歌曲的mv页面
 */
function goToMv() {
    $router.push(`/mv/${song.value?.mv}`)
}

</script>
<style scoped lang="scss">
.page {
    box-sizing: border-box;
    padding: 10px;
}

.song-infor {
    display: flex;
    flex-direction: column;
    min-height: 300px;
}

.information {
    // height: 300px;
    display: flex;

    h2 {
        font-size: 30px;
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

    // 歌曲信息
    .song-data {
        width: 100%;
        box-sizing: border-box;

        //  专辑
        div:nth-child(3) {
            span {
                font-size: 14px;
            }
        }

        // 歌手
        div:nth-child(2) {
            margin-top: 10px;
            color: var(--text-dark);
            font-size: 12px;
        }
    }

    // 相似歌曲
    .simi-songs {
        display: flex;
        flex-direction: column;
    }

    .song-func {
        margin-top: 10px;

        button {
            margin-right: 5px;
            font-size: 13px;
        }
    }
}

// 歌曲封面
.song-cover {
    margin-right: 10px;

    :deep(img) {
        width: 300px;
    }
}

@media screen and (max-width:675px) {
    .artist{
        font-size: 12px !important;
    }
    .song-infor {
        position: relative;

        .information {
            .song-cover {
                position: absolute;
                right: 0;
                width: 100px;

                :deep(img) {
                    width: 100px;
                }
            }
        }
    }
}


@media screen and (max-width:468px) {
    .song-infor {
        h2 {
            font-size: 15px;
            padding: 15px 0;
        }
    }

    .song-cover {
        position: absolute;
        width: 50px !important;

        :deep(img) {
            border-radius: 10px;
            width: 60px !important;
        }
    }
}
</style>