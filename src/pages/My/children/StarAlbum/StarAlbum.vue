<template>
    <div class="star-page">
        <div class="music-list">
            <ul v-if="!isEmpty&&!isLoading">
                <AlbumCard v-for="item in list" :key="item.id" :pic-url="item.picUrl" :id="item.id"
                    :name="item.name" :sub-time="item.subTime"
                />
            </ul>
            <SkeletonList v-if="isLoading" :length="10"/>
        </div>
        <div v-if="!isEmpty && pages > 1" class="pagination">
            <n-pagination v-model:page="page" :page-count="pages" />
        </div>
        <!--空内容-->
        <n-empty description="这一页没有内容呢 😅" v-if="isEmpty">
            <template #extra>
                <n-button size="small">
                    看看别的 ?
                </n-button>
            </template>
        </n-empty>
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