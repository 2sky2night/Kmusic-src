<template>
    <Transition name="drawer" appear>
        <div v-if="isShow" class="song-infor-drawer" @click.stop="">
            <div v-once class="drawer-header">
                <div>
                    <img :src="song.al.picUrl" />
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
            <div v-once class="song-func" @click.stop="toDone">
                <div class="play-now">
                    <span class="icon">
                        <NIcon size="20">
                            <IosPlayIcon />
                        </NIcon>
                    </span>立即播放
                </div>
                <div class="play-next">
                    <span class="icon">
                        <NIcon size="20">
                            <IosArrowForwardIcon />
                        </NIcon>
                    </span>下一首播放
                </div>
                <div class="add-playlist">
                    <span class="icon">
                        <NIcon size="20">
                            <MdPlayCircleIcon />
                        </NIcon>
                    </span>添加到歌单
                </div>
                <div class="infor">
                    <span class="icon">
                        <NIcon size="20">
                            <IosMusicalNotesIcon />
                        </NIcon>
                    </span>歌曲详情页
                </div>
                <div v-if="song.mv" class="mv">
                    <span class="icon">
                        <NIcon size="20">
                            <IosVideocamIcon />
                        </NIcon>
                    </span>前往mv
                </div>
                <div class="song-infor">
                    <div>
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
                    <div>
                        <span class="icon">
                            <NIcon size="20">
                                <IosAlbumsIcon />
                            </NIcon>
                        </span>
                        <span class="title">专辑:</span>
                        <span class="text" @click.stop="goToAlbum">{{ song.al.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
<script lang="ts" setup>
import { NIcon } from "naive-ui";
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
import { Song } from "@/api/public/indexfaces";
import { ref } from "vue";

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
    const value = (e.target as HTMLElement).className
    switch (value) {
        case 'play-now': console.log('立即播放'); break;
        case 'play-next': console.log('下一首播放'); break;
        case 'add-playlist': console.log('添加到歌单'); break;
        case 'mv': (window as any).$push(`/mv/${props.song.mv}`); break;
        case 'infor': (window as any).$push(`/song/${props.song.mv}`); break;
    }
    // 点击某一项后需要关闭抽屉
    toCloseDrawer()
}

/**
 * 去专辑页面
 */
function goToAlbum() {
    (window as any).$push(`/album/${props.song.al.id}`)
    toCloseDrawer()
}

/**
 * 去歌手页面
 */
function goToArtist(id: number) {
    (window as any).$push(`/artist/${id}`)
    toCloseDrawer()
}

</script>
<style scoped lang="scss">
.song-infor>div:first-child {
    display: flex;
}

// 功能按钮组
.song-func {
    font-size: 14px;
    display: flex;
    flex-grow: 1;
    flex-direction: column;

    .title {
        margin-right: 10px;
    }

    .icon {
        margin-right: 5px;
    }

    >div {
        flex-grow: 1;
        display: flex;
        align-items: center;
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
    padding-bottom: 15px;
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
    height: 60%;
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
