<template>
    <div class="music-list recommend-playlist">
        <TitleHeader title="推荐的歌单">
            <template #default>
                <RouterLink to="/discover/playlist">
                    <n-text class="text">
                        查看更多
                    </n-text>
                </RouterLink>
            </template>
        </TitleHeader>
        <SkeletonList v-if="isLoading" :cover-radius="10" :length="12" :text-center="false" />
        <ul v-else>
            <PlayListCard v-for="item in list" :cover-img-url="item.picUrl" :id="item.id" :name="item.name"
                :play-count="item.playCount" />
        </ul>
    </div>
</template>
<script lang='ts' setup>
import TitleHeader from '@/pages/Home/components/TitleHeader/TitleHeader.vue';
import { getRecPlayList } from '@/api/Home';
import type { RecommendPlaylist } from '@/api/Home/interfaces';
// 钩子
import useRecommend from '@/hooks/useRecommend'
const { list, isLoading } = useRecommend<RecommendPlaylist>(getRecPlayList)

</script>
