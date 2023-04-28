<template>
    <div class="song-sort-card" @dblclick="playMusic">
        <div>
            <span class="song-name text" @click.stop="toSongInfor">{{ song.name }}</span>
            ---
            <span @click.stop="toArtistInfor" class="text">{{ song.artists[0].name }}</span>
        </div>
        <n-icon size="15" :title="'播放 ' + song.name" @click.stop="playMusic">
            <IosPlay />
        </n-icon>
    </div>
</template>
<script lang='ts' setup>
import useMusicStore from '@/store/music';
import { IosPlay } from '@vicons/ionicons4';
import { useRouter } from 'vue-router';
import { SongMore } from '@/api/Song/interfaces';

// 自定义属性
const props = defineProps<{ song: SongMore }>()

// 歌曲仓库
const musicStore = useMusicStore()

//  路由实例
const $router = useRouter()

// 去音乐详情页
function toSongInfor() {
    $router.push(`/song/${props.song.id}`)
}

// 去歌手页面
function toArtistInfor() {
    $router.push(`/artist/${props.song.artists[0].id}`)
}

// 点击播放歌曲
function playMusic() {
    const { song } = props
    musicStore.setPlayingSong({
        album: song.album,
        artists: song.artists,
        id: song.id,
        name: song.name,
        isVip: song.privilege.freeTrialPrivilege.resConsumable
    })
}

</script>
<style scoped lang="scss">
.song-sort-card {
    padding: 2px 5px;
    cursor: pointer;
    color: var(--text-color) !important;
    font-size: 12px !important;
    height: 25px;
    transition: .3s;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.song-sort-card:nth-child(2n) {
    background-color: var(--hover-bg-color);
}
</style>