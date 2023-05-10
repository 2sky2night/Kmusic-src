<template>
    <div class="lyric-desktop" :style="{ backgroundImage: `url(${playingSong.album.picUrl})` }">
        <!--遮罩层-->
        <div class="mask">
            <div class="contianer">
                <!--歌曲信息以及控制器-->
                <div class="controller-and-infor">
                    <!--歌曲信息-->
                    <div class="infor">
                        <!--封面-->
                        <img :src="playingSong.album.picUrl">
                        <div>
                            <div @click="goToSong" class="song-name herf">{{ playingSong.name }}</div>
                            <div class="artist">
                                <span @click="goToArtist" class="herf">{{ playingSong.artists[0].name }}</span>
                                <span> - </span>
                                <span class="herf" @click="goToAlbum">{{ playingSong.album.name }}</span>
                            </div>
                        </div>
                    </div>
                    <!--控制器-->
                    <div class="controller">
                        <!--进度条-->
                        <div>
                            <div class="times">{{ playingTimeFormat(playingSong.currentTime) }}</div>
                            <n-slider :tooltip="false" @update:value="(value: number) => emit('timeUpdate', value)"
                                v-model:value="playingSong.currentTime" :max="playingSong.duration" :step=".1" />
                            <div class="times">{{ playingTimeFormat(playingSong.duration) }}</div>
                        </div>
                        <!--功能按钮-->
                        <div class="btns">
                            <div class="btn" @click="musicStore.changeType">
                                <n-icon size="25">
                                    <component :is="playType" />
                                </n-icon>
                            </div>
                            <div class="btn" @click="emit('pre')">
                                <n-icon size="25">
                                    <IosArrowBack />
                                </n-icon>
                            </div>
                            <div class="btn" @click="emit('togglePause')">
                                <n-icon size="25">
                                    <component :is="isPauseFormat" />
                                </n-icon>
                            </div>
                            <div class="btn">
                                <n-icon size="25" @click="emit('next')">
                                    <IosArrowForward />
                                </n-icon>
                            </div>
                            <div class="btn" @click="goToComment">
                                <n-icon size="25">
                                    <MessageOutlined />
                                </n-icon>
                            </div>
                        </div>
                    </div>
                </div>
                <!--歌词-->
                <Transition name="lyric">
                    <div v-if="showLyric" class="lyric-container">
                        <ul class="lyric-list" ref="listDOM" v-if="lyricArr.length">
                            <li class="btn" @click="() => changeCurrentTime(item.time)" v-for="(item, index) in lyricArr"
                                :key="item.time" :class="index === currentIndex ? 'active' : ''">
                                <span>{{ item.text }}</span>
                            </li>
                        </ul>
                        <div v-else class="empty">
                            <h1>纯音乐</h1>
                            <h2>敬请欣赏</h2>
                        </div>
                    </div>
                </Transition>
            </div>
            <!--关闭的按钮-->
            <div class="btn" @click="() => emit('toClose')">
                <n-icon size="35">
                    <IosArrowDown />
                </n-icon>
            </div>
            <!--隐藏/不隐藏歌词按钮-->
            <div class="btn showLyric" @click="showLyric = !showLyric" :title="showLyric ? '隐藏歌词' : '显示歌词'">
                <span>词</span>
                <n-icon size="40" v-if="showLyric" style="position: absolute;">
                    <Ban />
                </n-icon>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
// 钩子
import useMusicStore from '@/store/music'
import { storeToRefs } from 'pinia';
import { computed, watch, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
// 工具函数
import { playingTimeFormat, lyricFormat } from '@/utils/computed'
// 图标
import { Ban } from '@vicons/ionicons5'
import { IosArrowDown, IosArrowForward, IosArrowBack } from '@vicons/ionicons4'
import { MessageOutlined } from '@vicons/antd'

// 是否显示歌词
const showLyric = ref(true)
// 歌词容器
const listDOM = ref<HTMLUListElement | null>(null)
// 路由实例对象
const $router = useRouter()
// 音乐仓库
const musicStore = useMusicStore()
// 正在播放的歌曲信息
const { playingSong } = storeToRefs(musicStore)
// 歌曲播放的类型
const playType = computed(() => {
    switch (musicStore.playingSong.playType) {
        case 0: return 'RepeatOutline';
        case 1: return 'ReloadOutline';
        case 2: return 'MdPulse';
    }
})
// 解析歌词
const lyricArr = lyricFormat((playingSong.value.songLyric as any).lrc.lyric).filter(ele => ele.text).map(ele => {
    return {
        ...ele,
        flag: false
    }
})
// 当前需要显示的歌词索引
const currentIndex = ref(0);
// 暂停还是播放
const isPauseFormat = computed(() => {
    if (props.isPause) {
        // 当前是暂停 显示播放按钮
        return 'IosPlay'
    } else {
        // 当前是播放 显示暂停按钮
        return 'IosPause'
    }
})
// 自定义属性
const props = defineProps<{
    isPause: boolean;
}>()
// 自定义事件
const emit = defineEmits<{
    (e: "toClose"): void;
    (e: "togglePause"): void;
    (e: "timeUpdate", time: number): void;
    (e: "next"): void;
    (e: "pre"): void;
}>()

// 监听当前播放歌曲的时间更新歌词列表的标志位
watch(() => playingSong.value.currentTime, (v) => {
    lyricArr.forEach(ele => {
        if (v >= ele.time) {
            // 若当前播放的时间超过该歌词的时间 设置标志为true 代表时间已经超过当前歌词时间
            ele.flag = true
        } else {
            ele.flag = false
        }
    })
    // 获取到最后一个标志位为true的,说明当前正在唱这个歌词
    const index = lyricArr.findLastIndex(ele => ele.flag)
    // 若当前没一个标志位为true的,则设置索引为0
    currentIndex.value = index !== -1 ? index : 0
})

//  监听currentIndex变化 让对应歌词滚动进入视图
watch(currentIndex, (v) => {
    const list = listDOM.value as HTMLUListElement;
    list.children[v].scrollIntoView({ behavior: "smooth", block: "center" })
})

onMounted(() => {
    console.log(listDOM.value);
})

/**
 * 更新当前播放的歌曲时间
 * @param value 
 */
function changeCurrentTime(value: number) {
    emit("timeUpdate", value)
}


/**
 * 去评论歌曲页面
 */
function goToComment() {
    $router.push(`/song-comment/${playingSong.value.id}`);
    emit("toClose");
}

/**
 * 去歌手页面
 */
function goToArtist() {
    $router.push(`/artist/${playingSong.value.artists[0].id}`);
    emit("toClose");
}

/**
 * 去专辑页面
 */
function goToAlbum() {
    $router.push(`/album/${playingSong.value.album.id}`);
    emit("toClose");
}

/**
 * 去歌曲页面
 */
function goToSong() {
    $router.push(`/song/${playingSong.value.id}`);
    emit("toClose");
}

</script>
<script lang="ts">
import { defineComponent } from 'vue';
import { IosPause, IosPlay, MdPulse } from '@vicons/ionicons4'
import { RepeatOutline, ReloadOutline } from '@vicons/ionicons5'
export default defineComponent({
    components: {
        IosPause,
        IosPlay,
        MdPulse,
        RepeatOutline,
        ReloadOutline
    }
})
</script>
<style scoped lang="scss">
// 容器
.contianer {
    height: 100%;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;

    // 控制器和歌曲信息
    .controller-and-infor {
        width: 400px;
        display: flex;
        flex-direction: column;
        color: #fff;
        justify-content: flex-end;
        padding-bottom: 30px;

        // 歌曲信息
        .infor {
            >div {
                .song-name {
                    font-size: 25px;
                    display: inline-block;
                }

                .herf {
                    transition: .3s;
                    cursor: pointer;
                }

                .herf:hover {
                    color: var(--color-primary)
                }
            }

            img {
                border-radius: 10px;
                box-shadow: 0 0 5px var(--box-shadow);
                height: 400px;
                width: 400px;
            }
        }

        // 控制器
        .controller {
            >div {
                display: flex;
            }

            .btns {
                margin-top: 10px;
                justify-content: center;
            }

            .times {
                margin: 0 5px;
            }
        }

    }

    .lyric-container {
        height: 95%;
        flex-grow: 1;
    }

    // 歌词
    .lyric-list {
        margin-left: 100px;
        scroll-behavior: smooth;
        height: 95%;
        overflow-y: auto;
        box-sizing: border-box;
        padding: 0 10px;

        li {
            font-size: 25px;
            transition: .2s;
            margin: 20px 0;
            color: #ffffff69;
        }

        li.active {
            color: #fff;
        }
    }

    .empty {
        margin-left: 90px;
        height: 95%;
        color: #fff;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding-top: 100px;
        align-items: center;


        h1 {
            font-size: 50px;
            font-weight: normal;
        }
    }

    /*修改滚动条赛道样式*/
    .lyric-list::-webkit-scrollbar {
        width: 0px;
    }
}

.lyric-desktop {
    position: fixed;
    z-index: 1100;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-size: 150% 150%;
    background-position: center;

    // 遮罩层样式
    .mask {
        box-sizing: border-box;
        padding: 10px;
        height: 100%;
        width: 100%;
        backdrop-filter: blur(30px);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.203);
    }
}

// 按钮
.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    transition: .2s;
    cursor: pointer;
    color: #ffffff9b;
    padding: 10px;
    margin: 0 3px;
}

.btn:hover {
    color: #fff;
    background-color: #ffffff53;
}

// 隐藏按钮
.contianer+.btn {
    position: absolute;
    right: 10px;
    top: 10px;
}

.showLyric {
    position: absolute;
    right: 80px;
    top: 10px;
    font-size: 21px;
    padding-left: 15px;
    padding-right: 15px;
}

.lyric-enter-active {
    animation: lyricMove 1 .3s ease-in-out;
}

.lyric-leave-active {
    animation: lyricMove 1 .3s ease-in-out reverse;
}

@keyframes lyricMove {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }

}

@media screen and (max-width:1200px) {
    .contianer {
        .lyric-list {
            margin-left: 50px;
            margin-right: 50px;

            li {
                font-size: 20px;
            }
        }
    }

}

@media screen and (max-width:1120px) {
    .contianer {
        align-items: start;
        padding-top: 25px;
    }

    .contianer .controller-and-infor {
        height: 20vh !important;
        position: absolute;
        bottom: 0;
        box-sizing: border-box;
        padding: 0 10px;
        padding-bottom: 10px;
        width: 100%;

        .infor {
            padding-left: 10px;

            img {
                display: none;
            }
        }
    }

    .contianer .lyric-container {
        height: 80vh;
    }
}

@media screen and (max-width:700px) {
    .lyric-desktop {
        .contianer {
            width: 100%;
        }
    }

    .showLyric {
        display: none;
    }
}

@media screen and (max-width:500px) {
    .contianer {
        .controller-and-infor{
            .song-name{
                font-size: 17px !important;
            }
            span{
                font-size: 12px;
            }
        }
        .lyric-list {
            margin-left: 0px;
            margin-right: 0px;

            li {
                font-size: 14px;
                margin: 10px 0;
            }
        }
    }
    .contianer+.btn{
        top:5px;
        right: 5px;
        transform: scale(.7);
    }
}</style>