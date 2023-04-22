<template>
    <div class="star-page">
        <div class="music-list">
            <ul v-if="!isEmpty">
                <li v-for="item in list" :key="item.id">{{ item.name }}</li>
            </ul>
        </div>
        <div v-if="!isEmpty" class="pagination">
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
import type { Album } from '@/api/public/indexfaces';
import type { StarAlbumRes } from '@/api/My/Album/inferfaces'
import { getStarAlbum } from '@/api/My/Album';
import useStarList from '@/hooks/useStarList'
const { page, pages, list, isEmpty } = useStarList<StarAlbumRes, Album>(getStarAlbum,'my-album')
</script>
<style scoped>
.star-page {
    display: flex;
    flex-direction: column;
}
.pagination{
    align-self: center;
}
</style>