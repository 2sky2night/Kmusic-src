<template>
    <li>
        <div @click="toPlaylistInfor" class="play-list-img" @mouseenter="isHover = true" @mouseleave="isHover = false">

            <img :class="isHover ? 'img-hover' : ''" @load="imgDoneHander" :src="coverImgUrl"
                :style="{ maskImage: isHover ? 'linear-gradient(to bottom,rgba(150,150,150,.618) 0,#fff 100%,transparent 100%)' : '' }" />

            <Transition name="play">
                <div class="play-list-btn" v-if="!isLoading && isHover" @mouseenter="isHover = true">
                    <n-icon size="40">
                        <PlayIcon />
                    </n-icon>
                </div>
            </Transition>

            <Transition name="count">
                <div class="play-count" v-if="!isLoading && !isHover">
                    <n-icon>
                        <MdHeadsetIcon />
                    </n-icon>
                    <span>{{ countFormat(playCount) }}</span>
                </div>
            </Transition>

        </div>
        <div v-if="!isLoading" style="width:100%">
            <div class="playlist-name" @click.stop="toPlaylistInfor">
                <n-ellipsis :line-clamp="2" :tooltip="false">
                    {{ name }}
                </n-ellipsis>

            </div>
            <!--歌单作者的信息占位插槽-->
            <div style="font-size: 12px;">
                <slot></slot>
            </div>
        </div>

    </li>
</template>
<script lang='ts' setup>
import { countFormat } from '@/utils/computed'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { MdHeadset as MdHeadsetIcon } from '@vicons/ionicons4'
import { Play as PlayIcon } from '@vicons/ionicons5'

// 歌单的自定义属性
interface PlaylistProps {
    coverImgUrl: string;
    id: number;
    name: string;
    playCount: number;
}

// 是否鼠标悬浮在图片上?
const isHover = ref(false)

// 歌单图片是否正在加载?
const isLoading = ref(true)

// 自定义属性,歌单数据
const props = defineProps<PlaylistProps>()

// 路由实例对象
const $router = useRouter()

// 图片加载完成的回调
function imgDoneHander() {
    isLoading.value = false
}

// 点击歌单封面的回调
function toPlaylistInfor() {
    $router.push(`/playlist/${props.id}?page=1`)
}

</script>
<style scoped lang="scss">
// 播放按钮
.play-list-btn {
    cursor: pointer;
    position: absolute;
    top: 35%;
    left: 36%;
    padding: 0 5px;
    background-color: var(--mask-bg-color);
    color: var(--mask-text-color);
    border-radius: 50%;
    backdrop-filter: blur(4px);

    i {
        position: relative;
        top: 3px;
        left: 3px;
    }
}

.play-list-img {
    width: 100%;
    margin-bottom: 10px;
    border-radius: 5px;
    position: relative;
    overflow: hidden;

    img {
        transition: .5s;
        width: 100%;
        height: 100%;
        cursor: pointer;
        border-radius: 5px;
    }
}

li {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 180px;
}

// 播放量信息
.play-count {
    font-size: 12px;
    border-radius: 5px 0;
    color: var(--mask-text-color);
    padding: 3px 5px;
    display: flex;
    align-items: center;
    background-color: var(--mask-bg-color);
    bottom: 0;
    user-select: none;
    right: 0;
    position: absolute;
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);

    i {
        position: relative;
        top: -1.5px;
        margin-right: 3px;
    }
}

.playlist-name {
    transition: .3s;
    user-select: text;
    font-size: 13.5px;
    cursor: pointer;
}

.playlist-name:hover {
    color: var(--text-hover)
}

.play-enter-active {
    animation: play .3s 1 ease-in-out;
}

.play-leave-active {
    animation: play .3s reverse 1 ease-in-out;
}

@keyframes play {
    from {
        transform: scale(.5);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

.count-enter-active {
    animation: count .5s 1 ease-in-out;
}

.count-leave-active {
    animation: count .5s reverse 1 ease-in-out;
}

@keyframes count {
    from {
        opacity: 0;
        transform: translateY(100%);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

:deep(.img-hover) {
    transform: scale(1.2);
}
</style>
