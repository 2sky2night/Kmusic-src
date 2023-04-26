<template>
    <div class="page">
        <!--头部标题-->
        <div v-once>
            <h2>
                <span class="date">{{ new Date().getDate() }}</span>
                <n-icon size="90" color="#4098fc">
                    <IosCalendarIcon />
                </n-icon>
                <div>
                    <span style="color:#4098fc">每日推荐</span>
                    <n-text>根据你的音乐口味生成 · 每天 6:00 更新 </n-text>
                </div>
            </h2>
        </div>
        <SongItemSkeleton v-if="isLoading" :length="10"/>
        <ul v-else>
            <SongItem v-for="item in songs" :key="item.id" :song="item" />
        </ul>
    </div>
</template>
<script lang='ts' setup>

import { IosCalendar as IosCalendarIcon } from '@vicons/ionicons4'
import type { Song } from '@/api/public/indexfaces';
import { getReSongs } from '@/api/public/user';
import { onMounted, reactive, ref } from 'vue'

const isLoading = ref(false)

const songs = reactive<Song[]>([])
onMounted(async () => {
    isLoading.value = true
    const res = await getReSongs()

    if (res.code === 200) {
        res.data.dailySongs.forEach(ele => [
            songs.push(ele)
        ])
        isLoading.value = false
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
}</style>