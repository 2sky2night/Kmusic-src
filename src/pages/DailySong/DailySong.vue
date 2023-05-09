<template>
    <div class="page">
        <!--头部标题-->
        <div v-once>
            <h2>
                <span class="date">{{ new Date().getDate() >= 10 ? new Date().getDate() : '0' + new Date().getDate()
                }}</span>
                <n-icon size="90" color="#4098fc">
                    <IosCalendarIcon />
                </n-icon>
                <div>
                    <span style="color:#4098fc">每日推荐</span>
                    <n-text>根据你的音乐口味生成 · 每天 6:00 更新 </n-text>
                </div>
            </h2>
        </div>
        <SongItemSkeleton v-if="isLoading" :length="10" />
        <SongList v-else :song-list="songs" />
    </div>
</template>
<script lang='ts' setup>
import { IosCalendar as IosCalendarIcon } from '@vicons/ionicons4'
import type { Song } from '@/api/public/indexfaces';
import { getReSongs } from '@/api/public/user';
import { onMounted, reactive, ref } from 'vue'
import message from '@/utils/message';

const isLoading = ref(false)

const songs = reactive<Song[]>([])
onMounted(async () => {
    try {
        isLoading.value = true
        const res = await getReSongs()

        if (res.code === 200) {
            res.data.dailySongs.forEach(ele => [
                songs.push(ele)
            ])
            isLoading.value = false
        } else {
            await Promise.reject()
        }
    } catch (error) {
        message("获取每日推荐的歌曲失败 😫", "warning")
    }

})
</script>
<style scoped lang="scss">
.page {
    padding: 20px 10px;
    box-sizing: border-box;
}

h2 {
    position: relative;

    .date {
        position: absolute;
        left: 28px;
        top: 31px;
        font-size: 30px;
        font-weight: 600;
        color: var(--color-primary)
    }

    display: flex;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;

        span:first-child {
            font-size: 25px;
        }

        span:last-child {
            font-size: 14px;
        }
    }
}
</style>