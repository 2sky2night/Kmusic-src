<template>
    <Transition name="drawer" appear>
        <div v-if="isShow" class="song-infor-drawer" @click.stop="">
            <div v-once class="drawer-header">
                <div>
                    <img :src="song.al.picUrl || '../../../../public/cover.jpg'" />
                    <div>
                        <n-text>{{ song.name }}</n-text>
                        <div class="song-artists">
                            <span v-for="item in song.ar" :key="item.id">
                                {{ item.name }}
                            </span>
                        </div>
                    </div>
                </div>
                <div @click="toCloseDrawer" class="close-btn">
                    <NIcon size="25">
                        <IosCloseIcon />
                    </NIcon>
                </div>
            </div>
            <div v-once class="song-func">
                <div class="play-now" @click.stop="toDone">
                    <span class="icon">
                        <NIcon size="20">
                            <IosPlayIcon />
                        </NIcon>
                    </span>
                    <span>立即播放</span>
                </div>
                <div class="play-next" @click.stop="toDone">
                    <span class="icon">
                        <NIcon size="20">
                            <IosArrowForwardIcon />
                        </NIcon>
                    </span>
                    <span>下一首播放</span>
                </div>
                <div class="add-playlist" @click.stop="toDone">
                    <span class="icon">
                        <NIcon size="20">
                            <MdPlayCircleIcon />
                        </NIcon>
                    </span>
                    <span>添加到歌单</span>
                </div>
                <div class="infor" @click.stop="toDone">
                    <span class="icon">
                        <NIcon size="20">
                            <IosMusicalNotesIcon />
                        </NIcon>
                    </span>
                    <span>歌曲详情页</span>
                </div>
                <div v-if="song.mv" class="mv" @click.stop="toDone">
                    <span class="icon">
                        <NIcon size="20">
                            <IosVideocamIcon />
                        </NIcon>
                    </span>
                    <span>前往mv</span>
                </div>
                <!-- <div class="song-infor"> -->
                <div class="artist" @click.stop="toDone">
                    <span class="icon">
                        <NIcon size="20">
                            <IosMicIcon />
                        </NIcon>
                    </span>
                    <span class="title">歌手:</span>
                    <div class="song-artists">
                        <span @click.stop="goToArtist(item.id)" class="text" v-for="item in song.ar" :key="item.id">
                            {{ item.name }}
                        </span>
                    </div>
                </div>
                <div class="album" @click.stop="toDone">
                    <span class="icon">
                        <NIcon size="20">
                            <IosAlbumsIcon />
                        </NIcon>
                    </span>
                    <span class="title">专辑:</span>
                    <span>{{ song.al.name }}</span>
                </div>
                <!-- </div> -->
            </div>
        </div>
    </Transition>
</template>
<script lang="ts" setup>
// 组件
import { NIcon } from "naive-ui";
// 图标
import {
    IosMusicalNotes as IosMusicalNotesIcon,
    IosVideocam as IosVideocamIcon,
    MdPlayCircle as MdPlayCircleIcon,
    IosClose as IosCloseIcon,
    IosMic as IosMicIcon,
    IosDisc as IosAlbumsIcon,
    IosPlay as IosPlayIcon,
    IosArrowForward as IosArrowForwardIcon
} from "@vicons/ionicons4";
// 接口
import type { Song } from "@/api/public/indexfaces";
// 钩子
import { ref } from "vue";
import useMusicStore from "@/store/music";
import useUserStore from "@/store/user";
// 渲染函数
import playlistPanel from '@/render/PlaylistPanel'
import message from "@/utils/message";

// 音乐仓库
const musicStore = useMusicStore()
// 用户仓库
const userStore = useUserStore()
// 控制抽屉的显示
const isShow = ref(true);
const props = defineProps<{ song: Song; closeHandler: () => void }>();

/**关闭抽屉*/
function toCloseDrawer() {
    isShow.value = false;
    setTimeout(props.closeHandler, 500);
}

/**向容器暴露关闭抽屉的方法 */
defineExpose({ toCloseDrawer });

/**
 * 点击功能按钮的某一项
 */
function toDone(e: MouseEvent) {
    const value = (e.currentTarget as HTMLElement).className;

    switch (value) {
        case 'play-now': toSetPlayingSong(); break;
        case 'play-next': musicStore.addSongToList(props.song); break;
        case 'add-playlist': toAddPlaylist(); break;
        case 'mv': (window as any).$push(`/mv/${props.song.mv}`); break;
        case 'infor': (window as any).$push(`/song/${props.song.id}`); break;
        case 'album': (window as any).$push(`/album/${props.song.al.id}`); break;
        case 'artist': (window as any).$push(`/artist/${props.song.ar[0].id}`); break;
    }
    // 点击某一项后需要关闭抽屉
    toCloseDrawer()
}


/**
 * 去歌手页面
 */
function goToArtist(id: number) {
    (window as any).$push(`/artist/${id}`)
    toCloseDrawer()
}

/**
 * 播放歌曲
 */
function toSetPlayingSong() {
    // 通知歌曲列表组件播放歌曲了哟
    PubSub.publish('playMusic')
    // 将当前歌曲的数据发送给仓库中去,修改当前播放的歌曲信息
    musicStore.setPlayingSong({
        id: props.song.id,
        name: props.song.name,
        album: { name: props.song.al.name, id: props.song.al.id, picUrl: props.song.al.picUrl },
        artists: props.song.ar,
        isVip: props.song.privilege.freeTrialPrivilege.resConsumable
    })
}

/**
 * 点击歌曲添加到歌单中的回调
 */
function toAddPlaylist() {
    if (userStore.isLoginState) {
        playlistPanel(props.song.id);
    } else {
        message("请先登录 🧐", "info")
    }

}

</script>
<style scoped lang="scss">
.song-infor>div:first-child {
    display: flex;
}

// 功能按钮组
.song-func {
    padding-top: 5px;
    font-size: 14px;
    display: flex;
    flex-grow: 1;
    flex-direction: column;

    .title {
        margin-right: 10px;
    }

    .icon {
        margin-right: 5px;
        position: relative;
        top: 2.5px;
    }

    >div {
        flex-grow: 1;
        display: flex;
        padding: 0 10px;
        align-items: center;
        transition: .5s;
        cursor: pointer;
        border-radius: 10px;
    }

    >div:hover {
        background-color: var(--hover-bg-color);
    }

    .song-infor {
        border-top: 1px solid var(--box-border-color);
        flex-direction: column;
        align-items: start;

        >div {
            flex-grow: 1;
            display: flex;
            align-items: center;
        }
    }

    .text:hover {
        color: var(--color-primary) !important;
    }
}

.drawer-header {
    padding-bottom: 5px;
    border-bottom: 1px solid var(--box-border-color);

    // 头部的专辑封面和歌名
    div:first-child {
        display: flex;

        // 歌曲名称和艺人
        div {
            span:first-child {
                color: var(--text-color);
                font-size: 20px;
            }
        }
    }

    .close-btn {
        cursor: pointer;
        transition: 0.3s;
    }

    .close-btn:hover {
        color: var(--hover-bg-color-primary);
    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        margin-right: 10px;
    }

    display: flex;
    justify-content: space-between;
}

.song-infor-drawer {
    display: flex;
    flex-direction: column;
    color: var(--text-color);
    width: 100%;
    height: 55%;
    overflow: hidden;
    align-self: flex-end;
    background-color: var(--drawer-bg-color);
    border-radius: 10px 10px 0 0;
    box-sizing: border-box;
    padding: 10px;
}

.song-artists span {
    font-size: 12px !important;
    color: var(--text-dark) !important;
}

.song-artists span:not(:last-child)::after {
    content: "\\";
    margin: 0 5px;
}

.drawer-enter-active {
    animation: drawer 0.5s 1 ease-in-out;
}

.drawer-leave-active {
    animation: drawer 0.5s 1 reverse ease-in-out;
}

@keyframes drawer {
    from {
        transform: translateY(100%);
    }

    to {
        transform: translateY(0);
    }
}
</style>
