<template>
    <div class="music-controller">
        <!--上方进度条-->
        <div class="time-controller">
            <div class="time">
                {{ nowTime }}
            </div>
            <n-slider size="small" @update:value="timeUpdateHandler" :step="1" :max="song.duration" :tooltip="false"
                :value="song.currentTime" />
            <div class="time">
                {{ durationTime }}
            </div>
        </div>
        <!--控制器和歌曲信息-->
        <div class="audio-controller">
            <!--歌曲信息和实时歌词-->
            <div class="music-infor">
                <!--歌曲封面-->
                <div class="cover">
                    <div>
                        <n-icon color="#fff" size="20">
                            <IosArrowUp />
                        </n-icon>
                    </div>
                    <img :src="song.album.picUrl + '?param60y60'">
                </div>
                <!--歌曲名称和歌曲歌词或歌曲作者-->
                <div class="music">
                    <div class="name" @click="goToSong">
                        <n-ellipsis style="max-width: 240px">
                            {{ song.name }}
                        </n-ellipsis>
                    </div>
                    <div>
                        <span v-if="!song.songLyric?.klyric" class="artist" @click="goToArtist">{{ song.artists[0].name
                        }}</span>
                    </div>
                </div>
            </div>
            <!--功能按钮组-->
            <div class="btns">
                <div class="pre">
                    <n-icon size="35">
                        <MdArrowDropleft />
                    </n-icon>
                </div>
                <div @click="togglePauseMusic" class="pause-or-play">
                    <n-icon size="40">
                        <component :is="isPause?IosPlayCircle:PauseCircle" />
                    </n-icon>
                </div>
                <div class="next">
                    <n-icon size="35">
                        <MdArrowDropright />
                    </n-icon>
                </div>
                <div class="volume">
                    <n-icon :size="20">
                        <component :is="volumeFormat" />
                    </n-icon>
                    <n-slider size="small" v-model:value="song.volume" :step="0.1" :max="1" />
                </div>
                <div class="list">
                    <n-icon size="25">
                        <List />
                    </n-icon>
                </div>
            </div>
        </div>

        <audio autoplay name="media" ref="musicEle">
            <source :src="url" type="audio/mpeg">
        </audio>

    </div>
</template>
<script lang='ts' setup>
// 钩子
import useMusicStore from '@/store/music'
import { storeToRefs } from 'pinia';
import { onMounted, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router';
// 工具函数
import { playingTimeFormat } from '@/utils/computed';
// 图标
import { IosArrowUp, IosPlayCircle, MdArrowDropright, MdArrowDropleft } from '@vicons/ionicons4'
import { PauseCircle, List } from '@vicons/ionicons5'

// 自定义属性
const props = defineProps<{
    url: string;
}>()
// 路由实例
const $router = useRouter()
// 正在播放的歌曲信息
const { playingSong: song } = storeToRefs(useMusicStore())
// 音频播放器的DOM元素
const musicEle = ref<HTMLAudioElement | null>(null)
// 当前播放歌曲的时间格式化
const nowTime = computed(() => {
    return playingTimeFormat(song.value.currentTime)
})
// 当前播放歌曲的总时长格式化
const durationTime = computed(() => {
    return playingTimeFormat(song.value.duration)
})
// 是否暂停歌曲
const isPause = ref(false)
// 格式化当前音量大小
const volumeFormat = computed(() => {
    if (song.value.volume >= 0.7) {
        return 'MdVolumeHigh'
    } else if (song.value.volume > 0) {
        return 'MdVolumeLow'
    } else {
        return 'MdVolumeOff'
    }
})

// 监听音量变化的回调,更新audio标签的音量大小
watch(() => song.value.volume, (v) => {
    (musicEle.value as HTMLAudioElement).volume = v
})
/**
 * 用户滑动控制条值更新的回调
 * @param value - 更新的值
 */
function timeUpdateHandler(value: number) {
    console.log(value);
    (musicEle.value as HTMLAudioElement).currentTime = value;
}

/**
 * 播放或暂停音乐
 */
function togglePauseMusic() {
    const element = (musicEle.value as HTMLAudioElement);
    if (isPause.value) {
        // 当前为暂停播放,再次点击播放歌曲
        element.play()
    } else {
        // 当前为正在播放歌曲,再次点击暂停歌曲
        element.pause()
    }
}

/**
 * 跳转对应音乐页面
 */
function goToSong() {
    $router.push(`/song/${song.value.id}`);
}
/**
 * 跳转歌手页面
 */
function goToArtist() {
    $router.push(`/artist/${song.value.artists[0].id}`);
}

onMounted(() => {
    console.dir(musicEle.value);
    const element = (musicEle.value as HTMLAudioElement);

    // 歌曲全部加载完成的回调
    element.addEventListener("canplaythrough", (e) => {
        console.log('歌曲加载完毕');
        console.log(element.duration);
        // 获取歌曲时长
        song.value.duration = element.duration
        song.value.currentTime = element.currentTime
        // 将audio的音量保持用户设置的音量一致
        element.volume = song.value.volume
    });

    // 歌曲当前播放的时间发生变化时的回调
    element.addEventListener("timeupdate", (e) => {
        // 更新当前播放的歌曲时间
        song.value.currentTime = (e.target as HTMLAudioElement).currentTime
    });

    // 歌曲暂停时的回调
    element.addEventListener("pause", () => {
        isPause.value = true
    })

    // 歌曲播放时的回调
    element.addEventListener("play", () => {
        isPause.value = false
    })


})

</script>
<script lang="ts">
import { defineComponent } from 'vue';
import { MdVolumeHigh, MdVolumeLow, MdVolumeOff } from '@vicons/ionicons4'
export default defineComponent({
    components: {
        MdVolumeHigh,
        MdVolumeLow,
        MdVolumeOff
    }
})
</script>
<style scoped lang="scss">
.music-controller {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    audio {
        position: absolute;
        top: -100px;
    }

    .time-controller {
        display: flex;
        height: 20px;
        position: absolute;
        left: 0;
        right: 0;

        .time {
            background-color: var(--bg-dark-color);
            border-radius: 5px;
            font-size: 12px;
            display: flex;
            align-items: center;
            padding: 0 5px;
            margin: 0 5px;
        }
    }

    .audio-controller {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        padding: 4px 10px;

        // 功能按钮组
        .btns {
            display: flex;
            color: var(--color-primary);

            >div {
                height: 40px;
                transition: .3s;
                margin: 0 2.5px;
            }

            // 音量控制器
            .volume {
                display: flex;
                align-items: center;
                width: 80px;
            }

            .list {
                display: flex;
                align-items: center;
                cursor: pointer;
            }

            .pause-or-play {
                cursor: pointer;
            }

            .pre,
            .next {
                display: flex;
                position: relative;
                top: 2px;
                width: 35px;
                cursor: pointer;
                height: 35px;
                border-radius: 50%;

                i {
                    position: relative;
                    top: 1px;
                }
            }

            .pre i {
                left: -2px;
            }

            .pre:hover,
            .next:hover {
                color: #fff;
                background-color: var(--color-primary);
            }

            >.pause-or-play:hover {
                transform: scale(1.2);
            }
        }

        // 歌曲信息
        .music-infor {
            display: flex;

            // 歌曲封面
            .cover {
                height: 45px;
                height: 45px;
                position: relative;
                border-radius: 5px;
                overflow: hidden;
                cursor: pointer;

                div {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    backdrop-filter: blur(3px);
                    opacity: 0;
                    transition: .2s;
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                img {
                    width: 45px;
                    height: 45px;
                    transition: .2s;
                }
            }

            // 歌曲信息
            .music {
                margin-left: 5px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .name {
                    font-weight: 600;
                    cursor: pointer;
                    transition: .3s;
                }

                .artist {
                    font-size: 12px;
                    color: var(--text-dark);
                    cursor: pointer;
                    transition: .3s;
                }

                .name:hover,
                .artist:hover {
                    color: var(--color-primary)
                }
            }

            .cover:hover>div {
                opacity: 1;
            }

            .cover:hover>img {
                transform: scale(1.2);
            }
        }

    }
}

@media screen and (max-width:550px) {
    .btns .volume {
        display: none !important;
    }
}

@media screen and (max-width:450px) {
    .music-infor .name {
        font-size: 13px;
    }

    .pre,
    .next {
        display: none !important;
    }
}</style>