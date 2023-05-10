<template>
    <li v-once>
        <div class="mv-cover" @click="toMvPage">
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
            <n-ellipsis :tooltip="false">
                <span :title="title" @click.stop="toMvPage" style="font-size: 18px;"> {{ title }}</span>
            </n-ellipsis>
            <div class="createor-list">
                <n-ellipsis :tooltip="false">
                    <span class="mv-creator-name" v-for="(item, index) in creators" :key="item.userId">
                        <span @click.stop="toUserPage(item.userId)">{{ item.userName }}</span>
                        <n-divider vertical v-if="creators.length > 1 && index !== creators.length - 1" />
                    </span>
                </n-ellipsis>

            </div>

        </div>
    </li>
</template>
<script lang='ts' setup>
import { useRouter } from 'vue-router'
import { Createor } from '@/api/public/indexfaces'
import { countFormat, durationFormat } from '@/utils/computed'
import { PlaySquareOutlined as PlaySquareOutlinedIcon } from '@vicons/antd'
import { Play as PlayIcon } from '@vicons/ionicons5'
import message from '@/utils/message'
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
     * mv作者们
     */
    creators: Createor[];
    vid: string | number;
}

const props = defineProps<MvCardProps>()

const $router = useRouter()

function toUserPage(id: number) {
    $router.push(`/user/${id}`)
}

function toMvPage() {
    const id = props.vid
    if (isNaN(+id)) {
        message("该mv由用户上传,由于安全问题暂时不能访问  😀", "info")
    } else {
        $router.push(`/mv/${id}`)
    }

}

</script>
<style scoped lang="scss">
.createor-list {
    display: flex;
    font-size: 12px;
}

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
        transition: .3s;
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
        cursor: pointer;
        transition: .3s;
    }

    .mv-creator-name {
        cursor: pointer;
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