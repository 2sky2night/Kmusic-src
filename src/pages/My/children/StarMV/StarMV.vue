<template>
    <div class="star-page">
        <div class="music-list">
            <ul v-if="!isEmpty && !isLoading" class="mv">
                <MvCard :cover-url="item.coverUrl" :creators="item.creator" :durationms="item.durationms" :vid="item.vid"
                    :play-time="item.playTime" v-for="item in list" :key="item.vid" :title="item.title" />
            </ul>
            <SkeletonList :text-center="false" :cover-radius="8" v-if="isLoading" :length="12" />
        </div>
        <div v-if="!isEmpty && pages > 1" class="pagination">
            <n-pagination v-model:page="page" :page-count="pages" />
        </div>
        <!--空内容-->
        <EmptyPage description="没有收藏的mv哟 😁" :show-btn="false" v-if="isEmpty" />
    </div>
</template>
<script lang='ts' setup>
// 钩子
import useStarList from '@/hooks/useStarList';
// api
import { getStarMv } from '@/api/My/MV';
// 接口
import { MV } from '@/api/public/indexfaces';
import { StarMvRes } from '@/api/My/MV/interfaces';
const { isLoading, page, pages, list, isEmpty } = useStarList<StarMvRes, MV>(getStarMv, 'my-mv')

</script>