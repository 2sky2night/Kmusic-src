<template>
    <ul>
        <SongItem @play-music="handlerPlayMusic" v-for="item in songList" :key="item.id" :song="item" />
    </ul>
</template>
<script lang='ts' setup>
// 钩子
import useMusicStore from '@/store/music';
// 工具函数
import PubSub from 'pubsub-js';
// 接口
import { Song } from '@/api/public/indexfaces';

// 自定义属性
const props = defineProps<{ songList: Song[] }>()
// 音乐仓库
const musicStore = useMusicStore()

PubSub.subscribe('playMusic', handlerPlayMusic)

// 播放歌曲的回调 注意深拷贝,不然歌曲列表也会更着受影响
function handlerPlayMusic() {
    musicStore.updateSongList(Object.assign([], props.songList))
}

</script>