<template>
    <div class="music-list recommend-artist">
        <TitleHeader title="热门歌手">
            <template #titleMore>
                <n-tabs class="tabs" style="font-size: 12px;" size="small" type="line" @update:value="changeTab">
                    <n-tab :name="-1" style="font-size: 12px;">
                        全部类型
                    </n-tab>
                    <n-tab :name="7" style="font-size: 12px;">
                        华语
                    </n-tab>
                    <n-tab :name="96" style="font-size: 12px;">
                        欧美
                    </n-tab>
                    <n-tab :name="8" style="font-size: 12px;">
                        日本
                    </n-tab>
                </n-tabs>
            </template>
            <template #default>
                <RouterLink to="/discover/artist">
                    <n-text class="text">
                        查看更多
                    </n-text>
                </RouterLink>
            </template>
        </TitleHeader>
        <SkeletonList v-if="isLoading" :length="12" :text-center="true" :cover-radius="50" />
        <ul>
            <ArtistCard v-for="item in list" :id="item.id" :name="item.name" :picUrl="item.img1v1Url" :key="item.id">
                <n-text class="text">
                    {{ item.musicSize }} 首
                </n-text>
            </ArtistCard>
        </ul>
    </div>
</template>
<script lang='ts' setup>
import TitleHeader from '../TitleHeader/TitleHeader.vue';
import type { ArtistAreaType, Artist } from '@/api/public/indexfaces';
import ArtistCard from '@/components/Card/ArtistCard/ArtistCard.vue';
import { getRecArtist } from '@/api/Home';
import { reactive, onMounted, ref } from 'vue';

const list = reactive<Artist[]>([])
const isLoading = ref(false)

/**
 * 获取热门歌手 
 * @param type  - 歌手地区分类
 */
async function getArtists(type: ArtistAreaType = -1) {
    isLoading.value = true
    list.splice(0, list.length)
    const res = await getRecArtist(type)
    if (res.code === 200) {
        res.artists.forEach(ele => {
            list.push(ele)
        })
        isLoading.value = false
    }
}

/**
 * 切换地区歌手
 * @param type 
 */
function changeTab(type: ArtistAreaType) {
    getArtists(type);
}

onMounted(() => {
    getArtists()
})

</script>
<style scoped>
:deep(.n-tabs) {
    border: none;
}

@media screen and (max-width:500px) {
    :deep(.tabs) {
        display: none;
    }
}
</style>