<template>
    <div class="search-tab music-list">
        <ul v-if="!isLoading">
            <ArtistCard v-for="artist in artists" :id="artist.id" :key="artist.id" :name="artist.name"
                :pic-url="artist.img1v1Url" />
        </ul>
        <n-pagination v-if="total / pageSize > 1 && artists.length && !isLoading" style="align-self: center;" :page-slot="6"
            v-model:page="page" :item-count="total" v-model:page-size="pageSize" show-size-picker :page-sizes="pageSizes">
            <template #prefix>
                共 {{ total }} 项
            </template>
        </n-pagination>
        <EmptyPage v-if="!artists.length && !isLoading" description="搜索的关键词太犀利了,没有搜索结果呢 🥱" :show-btn="true" />
        <SkeletonList :length="pageSize" :cover-radius="50" :text-center="true" v-if="isLoading" />
    </div>
</template>
<script lang='ts' setup>
// 钩子
import { reactive } from 'vue';
import useSearchList from '@/hooks/useSearchList';
// 接口
import { Artist } from '@/api/public/indexfaces';
// api
import { getSearchArtist } from '@/api/Search/Artist';
// 工具函数
import message from '@/utils/message';
import ArtistCard from '@/components/Card/ArtistCard/ArtistCard.vue';

const artists = reactive<Artist[]>([])
const { isLoading, page, pageSize, pageSizes, keywords, total } = useSearchList(getArtistData)

async function getArtistData() {
    artists.length = 0;
    try {
        const res = await getSearchArtist(keywords.value, page.value, pageSize.value)
        if (artists.length) return;
        if (res.code !== 200) await Promise.reject()
        if (res.result.artistCount === 0) {
            message("搜索结果为空 👀", "info")
            return
        }


        total.value = res.result.artistCount;
        res.result.artists.forEach(ele => artists.push(ele))

    } catch (error) {
        message("搜索歌手失败 🧐", "warning")
    }
}

</script>
<style scoped></style>