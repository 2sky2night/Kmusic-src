<template>
    <li :class="`song-item ${playingSong.id === song.id ? 'song-item-active' : ''}`" @contextmenu="openDropDown"
        @dblclick="toSetPlayingSong">
        <div class="song-infor" v-once>
            <div style="min-width: 50px;max-width: 50px;margin-right: 10px;display: flex;">
                <img :src="song.al.picUrl + '?param=60y60' || '../../../../public/cover.jpg'">
            </div>

            <div>

                <div class="song-name">
                    <n-ellipsis style="max-width: 230px" :tooltip="false">
                        <span class="text" style="font-size: 16px;font-weight: 700;" @click.stop="goToSong">{{ song.name
                        }}</span>
                    </n-ellipsis>
                    <div class="song-tags">
                        <n-tag size="small"
                            style="margin-left: 3px;position: relative;top:-2px;transform: scale(.9);cursor: pointer;" round
                            type="error"
                            v-if="song.privilege && song.privilege.freeTrialPrivilege.resConsumable">VIP</n-tag>
                        <n-tag size="small" @click.stop="goToMv"
                            style="margin-left: 3px;position: relative;top:-2px;transform: scale(.9);cursor: pointer;" round
                            type="warning" v-if="song.mv">MV</n-tag>
                    </div>

                </div>

                <div class="artists-name">
                    <n-ellipsis style="max-width: 240px" :tooltip="false">
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
            <n-icon @click="toToggleLike" :color="isLike ? 'red' : ''" size="20"
                style="position: relative;top:3px;margin-right: 10px;">
                <IosHeartEmpty v-if="!isLike" />
                <IosHeart v-else />
            </n-icon>
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
import { IosMore as IosMoreIcon, IosHeartEmpty, IosHeart } from '@vicons/ionicons4'
// 工具函数
import { durationFormat } from '@/utils/computed'
// 接口
import { Song } from '@/api/public/indexfaces'
import { useRouter } from 'vue-router'
// 插件
import PubSub from 'pubsub-js'
// 仓库
import useMusicStore from '@/store/music'
import useUserStore from '@/store/user'
// 钩子 
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
// api
import { toggleLikeSong } from '@/api/public/song'
import message from '@/utils/message'

//音乐钩子
const musicStore = useMusicStore()
// 当前播放的歌曲
const { playingSong } = storeToRefs(musicStore)
// 用户仓库
const userStore = useUserStore()
// // 长按时间 根据长按 (移动端)
// let touchTime = 0
// // 长按计时器
// let timer: any = null

// 路由对象
const $router = useRouter()
// 是否喜欢当前音乐
const isLike = ref(userStore.userData.ids.some(ele => ele === props.song.id))
// 自定义属性
const props = defineProps<{
    /**
     * 歌曲信息
     */
    song: Song;
}>()

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

/**
 * 喜欢/取消喜欢歌曲
 */
async function toToggleLike() {
    if (!userStore.cookie && !userStore.isLogin) {
        return message("请登录后再进行操作 😂", "warning")
    }
    const id = props.song.id
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
 * 播放歌曲
 */
function toSetPlayingSong() {
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

    span {
        color: var(--color-primary)
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

.song-name {
    align-items: center;
    display: flex;
}

.song-tags {
    display: flex;
}

.duration {
    font-size: 12px;
}

.more {
    display: none;
}

@media screen and (max-width:700px) {
    .album-name {
        display: none;
    }

    .duration {
        display: none;
    }

    .more {
        display: inline-block;
    }
}

@media screen and (max-width:400px) {
    .song-tags {
        display: none;
    }
}

.song-more>i:nth-child(1) {
    transition: .2s;
    opacity: 0;
    transform: scale(.8);
}

.song-item:hover .song-more>i:nth-child(1) {
    opacity: 1;
    transform: scale(1);
}
</style>