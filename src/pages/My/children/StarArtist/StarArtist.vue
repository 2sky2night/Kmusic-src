<template>
    <div class="star-page">
        <div class="music-list">
            <ul v-if="!isLoading && !isLoading">
                <ArtistCard v-for="item in list" :id="item.id" :pic-url="item.picUrl" :name="item.name">
                    <template #default>
                        <span>{{ item.albumSize + '张' }}</span>
                    </template>
                </ArtistCard>
            </ul>
            <SkeletonList v-if="isLoading" :length="12" :text-center="true" :cover-radius="50" />
        </div>
        <div class="pagination" v-if="!isEmpty && pages > 1">
            <n-pagination v-model:page="page" :page-count="pages" />
        </div>
        <!--空内容-->
        <EmptyPage description="没有收藏的歌手哟 😐" :show-btn="false" v-if="isEmpty" />
    </div>
</template>
<script lang='ts' setup>
//接口
import { Artist } from '@/api/public/indexfaces';
import { StarArtistRes } from '@/api/My/Artist/interfaces';
// 钩子
import useStarList from '@/hooks/useStarList';
// api
import { getStarArtist } from '@/api/My/Artist';
import SkeletonList from '@/components/SkeletonList/SkeletonList.vue';
const { list, page, pages, isEmpty, isLoading } = useStarList<StarArtistRes, Artist>(getStarArtist, 'my-artist')
</script>
