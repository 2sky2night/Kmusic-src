<template>
    <div class="star-page">
            <div class="music-list">
                <ul v-if="!isEmpty && !isLoading" class="mv">
                    <MvCard :cover-url="item.coverUrl" 
                    :creator-name="item.creator.length? item.creator[0].userName:'无'" 
                    :durationms="item.durationms" :vid="item.vid"
                    :play-time="item.playTime" 
                    v-for="item in list" :key="item.vid" :title="item.title" />
                </ul>
                <SkeletonList v-if="isLoading" :length="12"/>
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
import MvCard from '@/components/MvCard/MvCard.vue';
// 钩子
import useStarList from '@/hooks/useStarList';
// api
import { getStarMv } from '@/api/My/MV';
// 接口
import { MV } from '@/api/public/indexfaces';
import { StarMvRes } from '@/api/My/MV/interfaces';
const { isLoading, page, pages, list, isEmpty } = useStarList<StarMvRes, MV>(getStarMv, 'my-mv')

</script>