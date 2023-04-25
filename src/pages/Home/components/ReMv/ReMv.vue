<template>
    <div class="music-list recommend-playlist">
        <TitleHeader title="推荐的mv" />
        <SkeletonList v-if="isLoading" :cover-radius="10" :length="12" :text-center="false" />
        <ul v-else>
            <MvCard v-for="item in list" 
            :cover-url="item.picUrl"
            :creators="item.artists.map(ele=>({userId:ele.id,userName:ele.name}))"
            :durationms="item.duration"
            :play-time="item.playCount"
            :title="item.name"
            :vid="item.id"
            />
        </ul>
    </div>
</template>
<script lang='ts' setup>
import TitleHeader from '@/pages/Home/components/TitleHeader/TitleHeader.vue';
import { getRecMv } from '@/api/Home';
import type  { RecommendMv } from '@/api/Home/interfaces';
import MvCard from '@/components/MvCard/MvCard.vue';
// 钩子
import useRecommend from '@/hooks/useRecommend'
const { list, isLoading } = useRecommend<RecommendMv>(getRecMv)

</script>
