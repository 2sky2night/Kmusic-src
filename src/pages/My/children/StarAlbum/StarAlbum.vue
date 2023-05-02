<template>
    <div class="star-page">
        <div class="music-list">
            <ul v-if="!isEmpty && !isLoading">
                <AlbumCard v-for="item in list" :key="item.id" :pic-url="item.picUrl" :id="item.id" :name="item.name"
                    :sub-time="item.subTime" :artists="item.artists" />
            </ul>
            <SkeletonList :text-center="false" :cover-radius="8" v-if="isLoading" :length="10" />
        </div>
        <div v-if="!isEmpty && pages > 1" class="pagination">
            <n-pagination v-model:page="page" :page-count="pages" />
        </div>
        <!--空内容-->
        <EmptyPage description="没有收藏的专辑哟 🤣" :show-btn="false" v-if="isEmpty" />
    </div>
</template>
<script lang='ts' setup>
// 接口
import type { Album } from '@/api/public/indexfaces';
import type { StarAlbumRes } from '@/api/My/Album/inferfaces'
// api
import { getStarAlbum } from '@/api/My/Album';
// 钩子
import useStarList from '@/hooks/useStarList'
const { page, pages, list, isEmpty, isLoading } = useStarList<StarAlbumRes, Album>(getStarAlbum, 'my-album')
</script>