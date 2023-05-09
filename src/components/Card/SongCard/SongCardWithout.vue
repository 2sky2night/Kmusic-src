<template>
    <li @click="emit('closeDrawer')" @dblclick="toSetPlayingSong" :class="`song-card ${musicStore.playingSong.id === song.id ? 'active' : ''}`">
        <img @click="()=>$router.push(`/album/${song.al.id}`)" :src="song.al.picUrl + '?param=60y60'">
        <div>
            <div @click="() => $router.push(`/song/${song.id}`)">{{ song.name }}</div>
            <div @click="() => $router.push(`/artist/${song.ar[0].id}`)">{{ song.ar[0].name }}</div>
        </div>
    </li>
</template>
<script lang='ts' setup>
// 接口
import type { Song } from '@/api/public/indexfaces';
// 钩子
import useMusicStore from '@/store/music'

// 音乐仓库
const musicStore = useMusicStore()
// 自定义属性
const props = defineProps<{
    song: Song
}>()
// 自定义事件
const emit = defineEmits<{
    (e:"closeDrawer"):void
}>()

/**
 * 播放歌曲，更新播放列表
 */
function toSetPlayingSong() {
    // 若点击的歌曲就是当前播放的音乐就无操作
    if (props.song.id === musicStore.playingSong.id) return
    // 将当前歌曲的数据发送给仓库中去,修改当前播放的歌曲信息
    musicStore.setPlayingSong({
        id: props.song.id,
        name: props.song.name,
        album: { name: props.song.al.name, id: props.song.al.id, picUrl: props.song.al.picUrl },
        artists: props.song.ar,
        isVip: props.song.privilege.freeTrialPrivilege.resConsumable
    })
}

</script>
<style scoped lang="scss">
.song-card {
    border-radius: 10px;
    transition: .3s;
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    img {
        height: 50px;
        width: 50px;
        border-radius: 5px;
        margin-right: 10px;
    }

    height: 70px;
    box-sizing: border-box;
    padding: 0 10px;
    cursor: pointer;

    >div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        div {
            transition: .2s;
            display: inline-block;
        }

        div:hover {
            color: var(--color-primary);
        }

        div:nth-child(2) {
            font-size: 12px;
        }
    }
}

.active,
.song-card:hover {
    background-color: var(--color-primary-light);
}</style>