<template>
    <div class="music-list recommend-song">
        <TitleHeader title="推荐的歌曲">
            <template #default>
                <RouterLink to="/discover/song">
                    <n-text class="text">
                        查看更多
                    </n-text>
                </RouterLink>
            </template>
        </TitleHeader>
        <SkeletonList v-if="isLoading" :cover-radius="10" :length="12" :text-center="false" />
        <ul :class="isLoading ?'loading-box':''">
            <SongCard
            v-for="item in list" 
            :key="item.id" 
            :name="item.name" 
            :id="item.id" 
            :pic-url="item.picUrl"
             :song="item.song" />
        </ul>
    </div>
</template>
<script lang='ts' setup>
import SongCard from '@/components/Card/SongCard/SongCard.vue'
// 组件
import TitleHeader from '@/pages/Home/components/TitleHeader/TitleHeader.vue';
// api
import { getRecMusic } from '@/api/Home';
// 接口
import type { RecommendMusic } from '@/api/Home/interfaces';
// 钩子
import useRecommend from '@/hooks/useRecommend'
const { list, isLoading } = useRecommend<RecommendMusic>(getRecMusic)


</script>

<style scoped>
.loading{
    overflow: hidden;
    max-height: 0;
}

</style>