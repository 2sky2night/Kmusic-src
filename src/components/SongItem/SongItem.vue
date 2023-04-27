<template>
    <li :class="`song-item ${playingSong.id === song.id ? 'song-item-active' : ''}`" @contextmenu="openDropDown">
        <div class="song-infor" v-once>
            <img :src="song.al.picUrl">

            <div>

                <n-ellipsis style="max-width: 200px">
                    <span class="text" style="font-size: 16px;font-weight: 700;" @click.stop="goToSong">{{ song.name
                    }}</span>
                    <n-tag size="small"
                        style="margin-left: 10px;position: relative;top:-2px;transform: scale(.9);cursor: pointer;" round
                        type="error" v-if="song.privilege&& song.privilege.freeTrialPrivilege.resConsumable">VIP</n-tag>
                    <n-tag size="small" @click.stop="goToMv"
                        style="margin-left: 10px;position: relative;top:-2px;transform: scale(.9);cursor: pointer;" round
                        type="warning" v-if="song.mv">MV</n-tag>
                </n-ellipsis>

                <div class="artists-name">
                    <n-ellipsis style="max-width: 240px">
                        <span v-for="(item, index) in song.ar" :key="item.id">
                            <span class="text" @click.stop="goToArtist(item.id)">{{ item.name }}</span>
                            <span v-if="index !== song.ar.length - 1">/</span>
                        </span>
                    </n-ellipsis>

                </div>
            </div>

        </div>
        <div class="album-name text" @click.stop="goToAlbum">
            <n-ellipsis style="max-width: 200px" class="text" :tooltip="false">
                {{ song.al.name }}
            </n-ellipsis>

        </div>
        <div class="song-more">
            <span v-once class="duration">{{ durationFormat(song.dt) }}</span>
            <span class="more" @click.stop="toLookMore">
                <n-icon class="text" size="18">
                    <IosMoreIcon />
                </n-icon>
            </span>
        </div>
    </li>
</template>
<script lang='ts' setup>
// 渲染函数
import songInfor from '@/render/SongInfor'
// 图标
import { IosMore as IosMoreIcon } from '@vicons/ionicons4'
// 工具函数
import { durationFormat } from '@/utils/computed'
// 接口
import { Song } from '@/api/public/indexfaces'
import { useRouter } from 'vue-router'
// 插件
import PubSub from 'pubsub-js'
// 仓库
import useMusicStore from '@/store/music'
import { storeToRefs } from 'pinia'
const { playingSong } = storeToRefs(useMusicStore())

const $router = useRouter()

const props = defineProps<{ song: Song }>()

/**去音乐页面 */
function goToSong() {
    $router.push(`/song/${props.song.id}`)
}
/**去专辑页面 */
function goToAlbum() {
    $router.push(`/album/${props.song.al.id}`)
}
/**去某个作者的页面 */
function goToArtist(id: number) {
    $router.push(`/artist/${id}`)
}
/**去mv页面 */
function goToMv() {
    $router.push(`/mv/${props.song.mv}`)
}
/**查看更多 */
function toLookMore() {
    songInfor(props.song)
}

/**打开下拉菜单 */
function openDropDown(e: MouseEvent) {
    e.preventDefault()
    PubSub.publish('open', { data: Object.assign({}, props.song), x: e.clientX, y: e.clientY })
}
</script>

<style scoped lang="scss">
.song-item {
    background-color: var(--bg-box-color);
    box-sizing: border-box;
    padding: 5px 10px;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    height: 85px;
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    border: 1px solid var(--box-border-color);
    transition: .3s;
}

/**歌曲播放时的样式 */
.song-item-active {
    background-color: var(--color-primary-light);
    span{
        color:var(--color-primary)
    }
}

.song-item:hover {
    border-color: var(--color-primary);
    box-shadow: 0 0 3px var(--box-shadow);
}


.album-name {
    font-size: 12px;
}

.song-infor {
    display: flex;
    width: 250px;

    img {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        margin-right: 10px;
    }
}

.duration {
    font-size: 12px;
}

.more {
    display: none;
}

@media screen and (max-width:650px) {
    .album-name {
        display: none;
    }

    .duration {
        display: none;
    }

    .more {
        display: inline-block;
    }
}</style>