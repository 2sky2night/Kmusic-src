<template>
    <div class="music-box">
        <Music v-if="!isLoading" :url="(songData as SongData).url" />
    </div>
</template>
<script lang='ts' setup>
// 工具函数
import message from '@/utils/message';
// 组件
import Music from './components/Music/Music.vue'
import type { SongData } from '@/api/public/song/interfaces'
// api
import { getSongs } from '@/api/ArtistSongs';
import { checkSong, getSongData } from '@/api/public/song';
// 钩子
import useMusicStore from '@/store/music';
import { onMounted, ref } from 'vue'

// 正在加载数据
const isLoading = ref(true)

// 歌曲数据
const songData = ref<SongData>()

// 歌曲仓库
const musicStore = useMusicStore()

// 自定义事件
const emit = defineEmits<{
    (e: "showFooter"): void;
    (e: "hideFooter"): void
}>()

// 监听仓库的方法执行,若当前设置了要播放的歌曲就获取歌曲的数据从而播放歌曲
musicStore.$onAction((e) => {
    if (e.name === 'setPlayingSong') {
        // 若为设置当前播放的歌曲方法 获取歌曲数据
        e.after(musicSetAfter)
    }
})

/**
 * 获取歌曲的url 播放歌曲
 */
async function musicSetAfter() {
    emit("hideFooter")
    isLoading.value = true
    const id = musicStore.playingSong.id as number
    // 检查歌曲 获取歌曲信息 获取歌曲歌词
    try {
        const resCheck = await checkSong(id)
        if (resCheck.success) {
            // 若歌曲能够正常播放 就获取歌曲数据
            const resSongData = await getSongData(id, "hires");

            // 若歌曲数据不正常 歌曲能够正常播放就将其保存在历史记录中 
            if (resSongData.code !== 200) await Promise.reject()
            // 若歌曲数据正常
            songData.value = resSongData.data[0]


            //  需要先获取歌曲的基本信息,来知晓歌曲是否为vip歌曲
            const resSongInfor = await getSongs([id])
            // 若歌曲信息获取失败
            if (resSongInfor.code !== 200) await Promise.reject()

            // 将歌曲的基本信息保存在仓库中
            musicStore.addHistory({ ...resSongInfor.songs[0], privilege: resSongInfor.privileges[0] })

            // 获取歌词
            await musicStore.getSongLyric()

            isLoading.value = false
            emit("showFooter")
        } else {
            // 若歌曲无法正常播放
            message(resCheck.message, "warning")
            // 歌曲无法播放就重置当前播放的歌曲
            musicStore.resetPlaysons()
            emit("hideFooter")
        }
    } catch (error) {
        message("播放歌曲出错啦 😱", "error")
        // 歌曲无法播放就重置当前播放的歌曲
        musicStore.resetPlaysons()
        emit("hideFooter")
    }
}

/**
 * 若音乐仓库中有歌曲数据,则直接加载歌曲 但是不能直接播放歌曲
 */
onMounted(() => {
    if (musicStore.playingSong.id) {
        // 根据歌曲id获取当前播放的歌曲
        const index = musicStore.songList.findIndex(ele => ele.id === musicStore.playingSong.id)
        const song = musicStore.songList[index === -1 ? 0 : index]
        musicStore.setPlayingSong({
            id: song.id,
            name: song.name,
            album: { name: song.al.name, id: song.al.id, picUrl: song.al.picUrl },
            artists: song.ar,
            isVip: song.privilege.freeTrialPrivilege.resConsumable
        })
    }
})

</script>
<style scoped>
.music-box {
    box-sizing: border-box;
    display: flex;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
}
</style>