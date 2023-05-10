<template>
    <div class="search-tab music-list">
        <ul v-if="!isLoading">
            <AlbumCard v-for="album in albums" :key="album.id" :id="album.id" :artists="album.artists" :name="album.name"
                :pic-url="album.picUrl" :sub-time="(album.publishTime as number)" />
        </ul>
        <n-pagination v-if="total / pageSize > 1 && albums.length && !isLoading" style="align-self: center;" :page-slot="6"
            v-model:page="page" :item-count="total" v-model:page-size="pageSize" show-size-picker :page-sizes="pageSizes">
            <template #prefix>
                共 {{ total }} 项
            </template>
        </n-pagination>
        <EmptyPage v-if="!albums.length && !isLoading" description="搜索的关键词太犀利了,没有搜索结果呢 🥱" :show-btn="true" />
        <SkeletonList :length="pageSize" :cover-radius="10" :text-center="false" v-if="isLoading" />
    </div>
</template>
<script lang='ts' setup>
// 接口
import { Album } from '@/api/public/indexfaces';
// api
import { getSearchAlbum } from '@/api/Search/Album';
// 钩子
import { reactive } from 'vue';
import useSearchList from '@/hooks/useSearchList';
// 工具函数
import message from '@/utils/message';


const albums = reactive<Album[]>([])

const { keywords, page, pageSize, pageSizes, isLoading, total } = useSearchList(getAlbum)

/**
 * 获取搜索的专辑
 */
async function getAlbum() {
    albums.length = 0;
    try {
        const res = await getSearchAlbum(keywords.value, page.value, pageSize.value)
        if (albums.length) return
        if (res.code !== 200) await Promise.reject()
        if (res.result.albumCount === 0) {
            message("搜索结果为空 👀", "info")
            return
        }
        res.result.albums.forEach(ele => {
            albums.push(ele)
        })
        total.value = res.result.albumCount;
    } catch (error) {
        message("搜索专辑失败 😰", "warning");
    }
}


</script>
<style scoped></style>