<template>
    <div class="song-lyric">
        <n-ellipsis :line-clamp="1" :tooltip="false">
            {{ showText }}
        </n-ellipsis>
    </div>
</template>
<script lang='ts' setup>
// 钩子
import useMusicStore from '@/store/music'
import { computed, watch, reactive } from 'vue';
// 工具函数
import { lyricFormat } from '@/utils/computed';
const musicStore = useMusicStore()
const lyricString = musicStore.playingSong.songLyric?.lrc.lyric

// 获取格式化后的逐帧歌词,标志位为当前播放的时间是否超过了该歌词
const lyric = reactive(lyricFormat(lyricString as string).map(ele => {
    return { ...ele, flag: false }
}).filter(ele => ele.text))




// 监听当前音乐播放的时间,根据当前时间
// 更新歌词显示
watch(() => musicStore.playingSong.currentTime, (v) => {
    lyric.forEach(ele => {
        if (v >= ele.time) {
            ele.flag = true
        } else {
            ele.flag = false
        }
    })
})

// 显示歌词中最后一个flag为true的文本, 若没有一个true则显示第一句歌词
const showText = computed(() => {
    const index = lyric.findLastIndex(ele => ele.flag);
    if (index === -1) {
        return lyric[0].text
    } else {
        //  return lyric[index].text? lyric[index].text:'无'
        return lyric[index].text
    }
})



</script>
<style scoped></style>