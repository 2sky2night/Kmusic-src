<template>
  <div class="music-controller">
    <!--上方进度条-->
    <div class="time-controller">
      <div class="time">
        {{ nowTime }}
      </div>
      <n-slider
        size="small"
        @update:value="timeUpdateHandler"
        :step="0.1"
        :max="song.duration"
        :tooltip="false"
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
        <div
          class="cover"
          @click="showLyricDesktop = true">
          <div>
            <n-icon
              color="#fff"
              size="20">
              <IosArrowUp />
            </n-icon>
          </div>
          <img :src="song.album.picUrl + '?param=60y60'" />
        </div>
        <!--歌曲名称和歌曲歌词或歌曲作者-->
        <div class="music">
          <div
            class="name"
            @click="goToSong">
            <n-ellipsis style="max-width: 240px">
              {{ song.name }}
            </n-ellipsis>
          </div>
          <div>
            <SongLyric v-if="song.songLyric && song.songLyric.klyric" />
            <span
              v-else
              class="artist"
              @click="goToArtist"
              >{{ song.artists[0].name }}</span
            >
          </div>
        </div>
      </div>
      <!--功能按钮组-->
      <div class="btns">
        <div class="pre">
          <n-icon
            size="35"
            title="上一首"
            @click="preSong">
            <MdArrowDropleft />
          </n-icon>
        </div>
        <div
          @click="togglePauseMusic"
          class="pause-or-play">
          <n-icon
            size="40"
            :title="isPause ? '播放' : '暂停'">
            <component :is="isPause ? IosPlayCircle : PauseCircle" />
          </n-icon>
        </div>
        <div class="next">
          <n-icon
            size="35"
            title="下一首"
            @click="nextSong">
            <MdArrowDropright />
          </n-icon>
        </div>
        <div class="volume">
          <n-icon :size="20">
            <component :is="volumeFormat" />
          </n-icon>
          <n-slider
            size="small"
            v-model:value="song.volume"
            :step="0.1"
            :max="1" />
        </div>
        <div class="playing-type">
          <n-icon
            :size="25"
            @click="musicStore.changeType">
            <component :is="playType" />
          </n-icon>
        </div>
        <div class="list">
          <n-icon
            size="25"
            title="打开播放列表"
            @click="showList = true">
            <List />
          </n-icon>
          <n-drawer
            :z-index="888"
            v-model:show="showList"
            style="width: 100%; max-width: 500px">
            <n-drawer-content
              title="播放列表"
              closable
              :native-scrollbar="false">
              <SongCardWithoutVue
                @close-drawer="showList = false"
                v-for="song in songList"
                :key="song.id"
                :song="song" />
            </n-drawer-content>
          </n-drawer>
        </div>
      </div>
    </div>

    <!--歌词桌面-->
    <Transition name="desktop">
      <LyricDesktop
        :is-pause="isPause"
        @next="nextSong"
        @time-update="timeUpdateHandler"
        @toggle-pause="togglePauseMusic"
        @pre="preSong"
        @to-close="showLyricDesktop = false"
        v-if="showLyricDesktop" />
    </Transition>
    <!--音源-->
    <audio
      :loop="musicStore.playingSong.playType === 1"
      autoplay
      name="media"
      ref="musicEle">
      <source
        :src="url"
        type="audio/mpeg" />
    </audio>
  </div>
</template>
<script lang="ts" setup>
// 钩子
import useMusicStore from "@/store/music";
import { storeToRefs } from "pinia";
import { onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
// 工具函数
import { playingTimeFormat } from "@/utils/computed";
// 图标
import {
  IosArrowUp,
  IosPlayCircle,
  MdArrowDropright,
  MdArrowDropleft,
} from "@vicons/ionicons4";
import { PauseCircle, List } from "@vicons/ionicons5";
// 组件
import SongCardWithoutVue from "@/components/Card/SongCard/SongCardWithout.vue";
import SongLyric from "./SongLyric.vue";
import LyricDesktop from "./LyricDesktop.vue";

// 音乐仓库
const musicStore = useMusicStore();
// 自定义属性
const props = defineProps<{
  url: string;
}>();
// 展示播放列表
const showList = ref(false);
// 路由实例
const $router = useRouter();
// 正在播放的歌曲信息和播放列表
const { playingSong: song, songList } = storeToRefs(musicStore);
// 音频播放器的DOM元素
const musicEle = ref<HTMLAudioElement | null>(null);
// 当前播放歌曲的时间格式化
const nowTime = computed(() => {
  return playingTimeFormat(song.value.currentTime);
});
// 当前播放歌曲的总时长格式化
const durationTime = computed(() => {
  return playingTimeFormat(song.value.duration);
});
// 是否暂停歌曲
const isPause = ref(false);
// 格式化当前音量大小
const volumeFormat = computed(() => {
  if (song.value.volume >= 0.7) {
    return "MdVolumeHigh";
  } else if (song.value.volume > 0) {
    return "MdVolumeLow";
  } else {
    return "MdVolumeOff";
  }
});
// 歌曲播放的类型
const playType = computed(() => {
  switch (musicStore.playingSong.playType) {
    case 0:
      return "RepeatOutline";
    case 1:
      return "ReloadOutline";
    case 2:
      return "MdPulse";
  }
});
// 是否显示歌词桌面
const showLyricDesktop = ref(false);

/**
 * 用户滑动控制条值更新的回调
 * @param value - 更新的值
 */
function timeUpdateHandler(value: number) {
  (musicEle.value as HTMLAudioElement).currentTime = value;
}

/**
 * 播放或暂停音乐
 */
function togglePauseMusic() {
  const element = musicEle.value as HTMLAudioElement;
  if (isPause.value) {
    // 当前为暂停播放,再次点击播放歌曲
    element.play();
    if (window.navigator.mediaSession) {
      // 设置媒体状态为播放
      navigator.mediaSession.playbackState = "playing";
    }
  } else {
    // 当前为正在播放歌曲,再次点击暂停歌曲
    element.pause();
    if (window.navigator.mediaSession) {
      // 设置媒体状态为暂停
      navigator.mediaSession.playbackState = "paused";
    }
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

/**
 * 点击按钮上一首
 */
function preSong() {
  if (song.value.playType === 0) {
    // 顺序播放上一首
    musicStore.preSong();
  } else if (song.value.playType === 1) {
    // 循环播放重置即可
    (musicEle.value as HTMLAudioElement).load();
  } else {
    // 随机播放
    musicStore.randomPlay();
  }
}

/**
 * 点击按钮下一首
 */
function nextSong() {
  if (song.value.playType === 0) {
    // 顺序播放上一首
    musicStore.nextSong();
  } else if (song.value.playType === 1) {
    // 循环播放重置即可
    (musicEle.value as HTMLAudioElement).load();
  } else {
    // 随机播放
    musicStore.randomPlay();
  }
}

onMounted(() => {
  const element = musicEle.value as HTMLAudioElement;

  // 歌曲全部加载完成的回调
  element.addEventListener("canplaythrough", async (e) => {
    // 获取歌曲时长
    song.value.duration = element.duration;
    song.value.currentTime = element.currentTime;
    // 将audio的音量保持用户设置的音量一致
    element.volume = song.value.volume;
    // 根据当前audio标签的状态播放状态设置isPause
    isPause.value = element.paused;
  });

  // 歌曲当前播放的时间发生变化时的回调
  element.addEventListener("timeupdate", (e) => {
    // 更新当前播放的歌曲时间
    song.value.currentTime = (e.target as HTMLAudioElement).currentTime;
  });

  // 歌曲暂停时的回调
  element.addEventListener("pause", () => {
    isPause.value = true;
  });

  // 歌曲播放时的回调
  element.addEventListener("play", () => {
    isPause.value = false;
  });

  // 歌曲播放完成的回调
  element.addEventListener("ended", () => {
    if (song.value.playType === 0) {
      // 若为循环播放就执行顺序下一首歌曲方法
      musicStore.nextSong();
    } else {
      // 随机播放
      musicStore.randomPlay();
    }
  });

  if (window.navigator.mediaSession) {
    // 当通过操作系统点击播放时
    navigator.mediaSession.setActionHandler("play", function () {
      togglePauseMusic();
      navigator.mediaSession.playbackState = "playing";
    });
    // 当通过操作系统点击暂停时
    navigator.mediaSession.setActionHandler("pause", function () {
      togglePauseMusic();
      navigator.mediaSession.playbackState = "paused";
    });
  }
});

// 监听音量变化的回调,更新audio标签的音量大小
watch(
  () => song.value.volume,
  (v) => {
    (musicEle.value as HTMLAudioElement).volume = v;
  }
);
</script>
<script lang="ts">
import { defineComponent } from "vue";
import { RepeatOutline, ReloadOutline } from "@vicons/ionicons5";
import {
  MdVolumeHigh,
  MdVolumeLow,
  MdVolumeOff,
  MdPulse,
} from "@vicons/ionicons4";
export default defineComponent({
  components: {
    MdVolumeHigh,
    MdVolumeLow,
    MdVolumeOff,
    ReloadOutline,
    RepeatOutline,
    MdPulse,
  },
});
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

      > div {
        height: 40px;
        transition: 0.3s;
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

      .playing-type {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .pre:hover,
      .next:hover {
        color: #fff;
        background-color: var(--color-primary);
      }

      > .pause-or-play:hover {
        transform: scale(1.2);
      }
    }

    // 歌曲信息
    .music-infor {
      display: flex;

      // 歌曲封面
      .cover {
        min-height: 45px;
        min-width: 45px;
        max-width: 45px;
        max-height: 45px;
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;

        div {
          height: 45px;
          width: 45px;
          border-radius: 5px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          backdrop-filter: blur(3px);
          opacity: 0;
          transition: 0.2s;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        img {
          border-radius: 5px;
          width: 45px;
          height: 45px;
          transition: 0.2s;
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
          transition: 0.3s;
          align-self: start;
        }

        .artist {
          font-size: 12px;
          color: var(--text-dark);
          cursor: pointer;
          transition: 0.3s;
        }

        .name:hover,
        .artist:hover {
          color: var(--color-primary);
        }
      }

      .cover:hover > div {
        opacity: 1;
      }

      .cover:hover > img {
        transform: scale(1.1);
      }
    }
  }
}

// 桌面歌词的弹出动画
.desktop-enter-active {
  animation: desktop 0.5s 1 ease-in-out;
}

.desktop-leave-active {
  animation: desktop 0.5s 1 ease-in-out reverse;
}

@keyframes desktop {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

@media screen and (max-width: 550px) {
  .btns .volume {
    display: none !important;
  }
}

@media screen and (max-width: 475px) {
  .playing-type {
    display: none !important;
  }
}

@media screen and (max-width: 450px) {
  .music-infor .name {
    font-size: 13px;
  }

  .pre,
  .next {
    display: none !important;
  }
}
</style>
