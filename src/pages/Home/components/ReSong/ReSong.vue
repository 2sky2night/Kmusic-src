<template>
    <div class="music-list recommend-playlist">
        <TitleHeader title="推荐的歌曲">
            <template #default>
                <RouterLink to="/discover/song">
                    <n-text class="text">
                        查看更多
                    </n-text>
                </RouterLink>
            </template>
        </TitleHeader>
        <SkeletonList v-if="!isFinish" :cover-radius="10" :length="12" :text-center="false" />
        <ul :class="isFinish?'':'loading'">
            <SongCard v-for="item in list" :key="item.id" :name="item.name" :id="item.id" :pic-url="item.picUrl"
                @img-load-finish="count++" :song="item.song" />
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
import { ref, watch } from 'vue';
const { list, isLoading } = useRecommend<RecommendMusic>(getRecMusic)
// 记录图片加载完成的数量
const count = ref(0)
const isFinish=ref(false)
watch(count, (v) => {
    if (v !== 0 && list.length === v) {
        console.log('全部加载完成');
        isFinish.value=true
    }
})

</script>

<style scoped>
.loading{
    overflow: hidden;
    max-height: 0;
}

</style>