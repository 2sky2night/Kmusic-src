<template>
    <div class="music-controller">
        1
        <audio v-if="!isLoading" controls autoplay name="media">
            <source :src="(songData as SongData).url" type="audio/mpeg">
        </audio>
        <span v-else>暂无歌曲</span>
    </div>
</template>
<script lang='ts' setup>
// 工具函数
import message from '@/utils/message';
// 组件
import Music from './components/Music.vue'
import { SongData } from '@/api/public/song/interfaces'
// api
import { getSongs } from '@/api/ArtistSongs';
import { checkSong, getSongData, getSongKeyFrameLyric, getSongLyric } from '@/api/public/song';
// 钩子
import useMusicStore from '@/store/music';
import { ref } from 'vue'

// 正在加载数据
const isLoading = ref(true)

// 歌曲数据
const songData = ref<SongData | {}>({})

// 歌曲仓库
const musicStore = useMusicStore()

// 监听仓库的方法执行,若当前设置了要播放的歌曲就获取歌曲的数据
musicStore.$onAction((e) => {
    if (e.name === 'setPlayingSong') {
        // 若为设置当前播放的歌曲方法 获取歌曲数据
        e.after(musicSetAfter)
    }
})

// 设置当前播放的歌曲方法更新后的回调
async function musicSetAfter() {
    isLoading.value = true
    const id = musicStore.playingSong.id as number
    // 检查歌曲 获取歌曲信息 获取歌曲歌词
    try {
        const resCheck = await checkSong(id)
        if (resCheck.success) {
            // 若歌曲能够正常播放 就获取歌曲数据
            const resSongData = await getSongData(id, "hires");
            if (resSongData.code === 200) {
                // 若歌曲数据正常

                (songData.value as SongData) = resSongData.data[0]

                // 歌曲能够正常播放就将其保存在历史记录中 需要先获取歌曲的基本信息
                const resSongInfor = await getSongs([id])
                if (resSongInfor.code === 200) {
                    // 将歌曲的基本信息保存在仓库中
                    musicStore.addHistory({...resSongInfor.songs[0],privilege:resSongInfor.privileges[0]})
                } else {
                    await Promise.reject()
                }

                isLoading.value = false
            } else {
                // 若歌曲无法正常播放
                await Promise.reject()
            }
        } else {
            // 若歌曲无法正常播放
            message(resCheck.message, "warning")
            // 歌曲无法播放就重置当前播放的歌曲
            musicStore.resetPlaysons()
        }
    } catch (error) {
        message("播放歌曲出错啦 😱", "error")
        // 歌曲无法播放就重置当前播放的歌曲
        musicStore.resetPlaysons()
    }
}

</script>
<style scoped></style>