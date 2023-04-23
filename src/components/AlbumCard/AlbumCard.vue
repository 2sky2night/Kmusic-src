<template>
    <li>
        <ImgLoad v-if="isLoading" />
        <div @click="toAlbumInfor" class="album-cover" @mouseenter="isHover = true" @mouseleave="isHover = false">
            <n-image :class="isHover ? 'img-hover' : ''" @load="imgDoneHander" preview-disabled :src="picUrl" :lazy="true"
                :style="{ maskImage: isHover ? 'linear-gradient(to bottom,rgba(150,150,150,.618) 0,#fff 100%,transparent 100%)' : '' }" />
            <Transition name="play">
                <div class="play-btn" v-if="!isLoading && isHover" @mouseenter="isHover = true">
                    <n-icon size="40">
                        <PlayIcon />
                    </n-icon>
                </div>
            </Transition>

            <Transition name="time">
                <div class="time-data" v-if="!isLoading && !isHover">
                    <span>{{ timeFormat }}</span>
                </div>
            </Transition>

        </div>
        <div class="album-name" v-if="!isLoading">
            <n-ellipsis :line-clamp="2" style="word-break: break-all;" :tooltip="false">
                <span>{{ name }}</span>
            </n-ellipsis>
        </div>
        <!--专辑信息占位插槽-->
        <slot></slot>
    </li>
</template>
<script lang='ts' setup>
import { useRouter } from 'vue-router'
import ImgLoad from '@/components/ImgLoad/ImgLoad.vue'
import { computed, ref } from 'vue'
import { Play as PlayIcon } from '@vicons/ionicons5'

// 歌单的自定义属性
interface PlaylistProps {
    picUrl: string;
    id: number;
    name: string;
    /**
     * 发布时间
     */
    subTime: number;
}

// 是否鼠标悬浮在图片上?
const isHover = ref(false)

// 专辑图片是否正在加载?
const isLoading = ref(true)

// 自定义属性,专辑数据
const props = defineProps<PlaylistProps>()

// 格式化时间的数据
const timeFormat = computed(() => {
    const data = new Date(props.subTime)
    return data.toLocaleDateString().replaceAll('/', '-')
})

// 路由实例对象
const $router = useRouter()

// 图片加载完成的回调
function imgDoneHander() {
    isLoading.value = false
}

// 点击路由的回调
function toAlbumInfor() {
    $router.push(`/album/${props.id}`)
}

</script>
<style scoped lang="scss">
// 播放按钮
.play-btn {
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

.album-cover {
    width: 100%;
    margin-bottom: 10px;
    border-radius: 5px;
    position: relative;
    overflow: hidden;

    :deep(.n-image) {
        transition: .5s;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    :deep(.n-image)img {
        border-radius: 5px;
        width: 100%;
    }
}

li {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 180px;
}

// 时间数据
.time-data {
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

.album-name {
    span:hover {
        color: var(--text-hover)
    }

    span {
        transition: .2s;
    }
    user-select: text;
    font-size: 13.5px;
    align-self: flex-start;
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

.time-enter-active {
    animation: count .5s 1 ease-in-out;
}

.time-leave-active {
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
