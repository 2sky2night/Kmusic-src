<template>
    <div class="song-infor">
        <div class="information">
            <!--歌曲封面-->
            <div class="song-cover">
                <n-image :src="song?.al.picUrl" />
            </div>
            <!--歌曲名称 作者等信息-->
            <div class="song-data">
                <h2>{{ song?.name }}</h2>
                <div>
                    <span>歌手: </span>
                    <span @click.stop="$router.push(`/artist/${item.id}`)" class="artist" v-for="item in song?.ar"
                        :key="item.id">{{ item.name }}</span>
                </div>
                <div>
                    <span>专辑: </span>
                    <span @click.stop="$router.push(`/album/${song?.al.id}`)" class="text" v-text="song?.al.name" />
                </div>
                <!--相似歌曲推荐-->
                <div class="simi-songs">
                    <span>相似歌曲</span>
                    <SongSortCard v-for="item in simiSongs" :song="item" :key="item.id" />
                </div>
                <div class="song-func">
                    <n-button @click="playMusic">播放</n-button>
                </div>
            </div>

        </div>
        <div class="simi-playlist music-list">
            <!--推荐歌单-->
            <TitleHeader title="包含这首歌的歌单" />
            <ul>
                <PlayListCard v-for="item in simiPlaylist" :key="item.id" :cover-img-url="item.coverImgUrl" :id="item.id"
                    :name="item.name" :play-count="item.playCount" />
            </ul>
        </div>
    </div>
</template>
<script lang='ts' setup>
// 接口
import type { Song, Privilege, Playlist } from '@/api/public/indexfaces';
import type { SongMore } from '@/api/Song/interfaces';
// api
import { getSongInfor, getSimiPlaylist, getSimiSongs } from '@/api/Song';
// 钩子
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// 工具函数
import message from '@/utils/message';
// 组件
import SongSortCard from '@/components/Card/SongSortCard/SongSortCard.vue';
import TitleHeader from '@/pages/Home/components/TitleHeader/TitleHeader.vue';
// 仓库
import useMusicStore from '@/store/music'
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


onMounted(async () => {
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
        // 去除最后一个相似歌曲
        // simiSongs.pop()
        // 获取包含这首歌的歌单
        const resSimiPlaylist = await getSimiPlaylist(+$route.params.id)
        if (resSimiPlaylist.code !== 200) Promise.reject()
        resSimiPlaylist.playlists.forEach(ele => {
            simiPlaylist.push(ele)
        })
    } catch (error) {
        message("获取歌曲数据失败 🤔", "error", () => $router.back())
    }


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

</script>
<style scoped lang="scss">
.song-infor {
    display: flex;
    flex-direction: column;
    min-height: 300px;
}

.information {
    height: 300px;
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
        padding-right: 10px;
        margin-right: 10px;

        //  专辑
        div:nth-child(3) {
            span {
                font-size: 14px;
            }
        }

        // 歌手
        div:nth-child(2) {
            color: var(--text-dark);
            font-size: 14px;
        }
    }

    // 相似歌曲
    .simi-songs {
        display: flex;
        flex-direction: column;
    }
}

// 歌曲封面
.song-cover {
    margin-right: 10px;

    :deep(img) {
        width: 300px;
    }
}
</style>