<template>
    <li class="song-card" >
        <div class="song-cover" @click="goToSong">
            <img :src="picUrl">
            <div class="song-more">

                <div class="item">
                    <span class="title">歌手:</span>
                    <span  @click.stop="goToArtist(item.id)" class="text" v-for="item in song.artists" :key="item.id">
                        {{ item.name }}
                    </span>
                </div>

                <div class="item">
                    <span class="title">专辑:</span><br />
                    <span class="text" @click.stop="goToAlbum">{{ song.album.name }}</span>
                </div>

                <div class="item">
                    <span class="title">发布时间:
                        {{ timeFormat(song.album.publishTime as number) }}
                    </span>
                </div>

                <div class="item">
                    <span class="title">时长:{{ durationFormat(song.duration) }}</span>
                </div>
            </div>
        </div>
        <span class="song-infor text" @click="goToSong">
            {{ name }}
        </span>

    </li>
</template>
<script lang='ts' setup>
import { useRouter } from 'vue-router';

import { timeFormat, durationFormat } from '@/utils/computed'
import { Song } from '@/api/public/indexfaces';

interface SongProps {
    id: number;
    name: string;
    picUrl: string;
    song: Song
}

const props = defineProps<SongProps>()

// const emit = defineEmits<{
//     (e: "imgLoadFinish"): void
// }>()

const $router = useRouter()

/**
 * 去某个歌手详情页
 * @param id 
 */
function goToArtist(id:number) {
    $router.push(`/artist/${id}`)
}

/**
 * 去专辑详情页
 */
function goToAlbum() {
    $router.push(`/album/${props.song.album.id}`)
}

/**
 * 去歌曲详情页
 */
function goToSong() {
    $router.push(`/song/${props.id}`)
}

// function imgLoadFinish() {
//     emit("imgLoadFinish")
// }

</script>
<style scoped lang="scss">
.song-cover {
    cursor: pointer;
    position: relative;
    border-radius: 10px;
    overflow: hidden;

    img {
        border-radius: 10px;
        width: 100%;
        height: 100%;
    }
}

.song-more {
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 12px;
    color: white;
    top: 0;
    left: 0;
    right: 0;
    bottom: 6.5px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.426);
    backdrop-filter: blur(5px);
    word-break: break-all;
    opacity: 0;
    transition: .5s;
    .title {
        font-size: 13px;
        font-weight: 700;
    }
}
.song-cover:hover .song-more{
    opacity: 1;
}
.song-more .item:first-child{
    display: flex;
    flex-direction: column;
    span{
        align-self: start;
    }
}
</style>