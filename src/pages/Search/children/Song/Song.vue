<template>
    <div class="search-tab">
        <ul v-if="!isLoading">
            <SongList :song-list="songs" />
            <n-pagination v-if="total / pageSize > 1 && songs.length" style="align-self: center;" :page-slot="5"
                v-model:page="page" :item-count="total" v-model:page-size="pageSize" show-size-picker
                :page-sizes="pageSizes">
                <template #prefix>
                    共 {{ total }} 项
                </template>
            </n-pagination>
            <EmptyPage v-if="!songs.length" description="搜索的关键词太犀利了,没有搜索结果呢 🥱" :show-btn="true" />
        </ul>
        <SongItemSkeletonList v-else :length="20" />
    </div>
</template>
<script lang='ts' setup>
// 接口
import { Song } from '@/api/public/indexfaces';
// 钩子
import { reactive } from 'vue';
import useSearchList from '@/hooks/useSearchList'
// api
import { getSearchSong } from '@/api/Search/Song';
// 工具函数
import message from '@/utils/message';

// 钩子的数据
const { isLoading, page, total, keywords, pageSize, pageSizes } = useSearchList(getSong)
// 歌曲
const songs = reactive<Song[]>([])

async function getSong() {
    songs.length = 0;
    try {
        const res = await getSearchSong(keywords.value, page.value, pageSize.value)
        if (songs.length) return
        if (res.code !== 200) await Promise.reject()
        if (res.result.songCount === 0) {
            message("搜索结果为空 👀", "info")
            return
        }

        res.result.songs.forEach(ele => {
            songs.push(ele)
        })
        total.value = res.result.songCount;
    } catch (error) {
        message("搜索歌曲失败 😎", "warning")
    }
}

</script>
<style scoped>
ul {
    display: flex;
    flex-direction: column;
}
</style>