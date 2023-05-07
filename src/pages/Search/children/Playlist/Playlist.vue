<template>
    <div class="search-tab music-list">
        <ul v-if="!isLoading">
            <PlayListCard v-for="playlist in playlists" :key="playlist.id" :cover-img-url="playlist.coverImgUrl"
                :id="playlist.id" :name="playlist.name" :play-count="playlist.playCount">
                <span class="text" style="position: relative;top:-5px">{{ playlist.creator.nickname }}</span>
            </PlayListCard>
        </ul>
        <n-pagination v-if="total / pageSize > 1 && playlists.length && !isLoading" style="align-self: center;"
            :page-slot="6" v-model:page="page" :item-count="total" v-model:page-size="pageSize" show-size-picker
            :page-sizes="pageSizes" />
        <EmptyPage v-if="!playlists.length && !isLoading" description="搜索的关键词太犀利了,没有搜索结果呢 🥱" :show-btn="true" />
        <SkeletonList :length="pageSize" :cover-radius="10" :text-center="false" v-if="isLoading" />
    </div>
</template>
<script lang='ts' setup>
// 接口
import { Playlist } from '@/api/public/indexfaces';
// api
import { getSearchPlaylist } from '@/api/Search/Playlist';
// 钩子
import { reactive } from 'vue';
import useSearchList from '@/hooks/useSearchList';
// 工具函数
import message from '@/utils/message';

const { keywords, isLoading, total, page, pageSize, pageSizes } = useSearchList(getPlaylistData)

const playlists = reactive<Playlist[]>([])

async function getPlaylistData() {
    playlists.length = 0;
    try {
        const res = await getSearchPlaylist(keywords.value, page.value, pageSize.value)
        if (playlists.length) return;
        if (res.code !== 200) await Promise.reject();
        if (res.result.playlistCount === 0) {
            message("搜索结果为空 👀", "info")
            return
        }

        // 获取总数
        total.value = res.result.playlistCount;
        // 获取当前页的歌单
        res.result.playlists.forEach(ele => playlists.push(ele))

    } catch (error) {
        message("搜索歌单失败 😎", "warning")
    }
}

</script>
<style scoped></style>