<template>
    <li>
        <div class="mv-cover">
            <img :src="coverUrl">
            <div class="mv-data">
                <span>{{ durationFormat(durationms) }}</span>
                <span>
                    <n-icon size="15">
                        <PlaySquareOutlinedIcon />
                    </n-icon>
                    {{ countFormat(playTime) }}
                </span>
            </div>
            <div class="mv-play">
                <div>
                    <n-icon color="#fff" size="30">
                        <PlayIcon />
                    </n-icon>
                </div>
            </div>
        </div>
        <div class="mv-infor">
            <n-ellipsis :line-clamp="2" style="word-break: break-all;" :tooltip="false">
                <span> {{ title }}</span>
            </n-ellipsis>
            <span class="mv-creator-name">{{ creatorName }}</span>
        </div>
    </li>
</template>
<script lang='ts' setup>
import { countFormat, durationFormat } from '@/utils/computed'
import { PlaySquareOutlined as PlaySquareOutlinedIcon } from '@vicons/antd'
import { Play as PlayIcon } from '@vicons/ionicons5'
interface MvCardProps {
    title: string;
    /**
     * 视频时长ms
     */
    durationms: number;
    /**
     * 播放次数
     */
    playTime: number;
    /**
     * mv封面
     */
    coverUrl: string;
    /**
     * mv作者
     */
    creatorName: string;
    vid: string;
}
const props = defineProps<MvCardProps>()
</script>
<style scoped lang="scss">
li {
    min-height: 100%;
    display: flex;
    flex-direction: column;
}

.mv-cover {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-radius: 10px;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 110px;
    margin-bottom: 10px;

    img {
        transition: .4s;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .mv-data {
        z-index: 100;
        position: absolute;
        bottom: 0;
        top: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: space-between;

        span:first-child {
            align-self: self-end;
        }

        span:last-child {
            align-self: flex-start;

            i {
                position: relative;
                top: 3.1px;
                margin-right: 1px;
            }
        }

        span {
            font-size: 12px;
            border-radius: 0px 10px;
            background-color: rgba(0, 0, 0, 0.236);
            color: #fff;
            padding: 5px;
            display: inline-block;
            backdrop-filter: blur(10px);
        }
    }

    /**播放按钮 */
    .mv-play {
        background-color: rgba(0, 0, 0, 0.197);
        z-index: 99;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        display: none;

        div {
            transition: 1s;
            padding: 10px;
            display: flex;
            border-radius: 50%;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(10px);
            i {
                position: relative;
                left: 3px;
            }
        }
    }
}

.mv-cover:hover img {
    transform: scale(1.1);
}

.mv-cover:hover .mv-play {
    display: flex;
}

/**播放按钮被鼠标悬浮时的状态 */
.mv-cover:hover .mv-play>div {
    animation: toBig .5s 1 ease-in-out;
}

// mv的信息
.mv-infor {
    user-select: text;
    display: flex;
    flex-direction: column;

    span {
        transition: .3s;
        font-size: 15px;
    }

    .mv-creator-name {
        font-size: 12px;
        color: var(--text-dark)
    }

    :hover {
        color: var(--text-hover);
    }
}

@keyframes toBig {
    from {
        opacity: 0;
        transform: scale(.5);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>