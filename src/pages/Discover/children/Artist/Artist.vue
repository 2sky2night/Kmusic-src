<template>
    <div class="discover-artist">
        <div class="filter">
            <h1>{{ result.includes('全部') ? result.replace('全部', '') : result }}</h1>
            <div class="filter-artist">
                歌手
                <n-tag :bordered="false" :class="`tag ${artistType === item.value ? 'tag-active' : ''}`"
                    @click="() => setType('artist', item.value)" v-for="item in artistTypes" :key="item.value">{{ item.name
                    }}</n-tag>
            </div>
            <div class="filter-area">
                地区
                <n-tag :bordered="false" :class="`tag ${areaType === item.value ? 'tag-active' : ''}`"
                    @click="() => setType('area', item.value)" v-for="item in areaTypes" :key="item.value">{{ item.name
                    }}</n-tag>
            </div>
            <div class="filter-words">
                字母
                <n-tag :bordered="false" @click="() => setType('word', item.value)" style="padding: 0 10px;"
                    :class="`tag ${wordType === item.value ? 'tag-active' : ''}`" v-for="item in wordTypes"
                    :key="item.value">{{
                        item.name }}</n-tag>
            </div>
        </div>
        <div class="music-list" style="margin-top: 20px;">
            <SkeletonList v-if="isloadingAll" :length="12" :cover-radius="50" :text-center="true" />
            <ul>
                <ArtistCard v-for="item in list" :key="item.id" :id="item.id" :name="item.name" :pic-url="item.img1v1Url" />
            </ul>
            <n-button style="align-self: center;padding: 0 80px;" :loading="isLoading" strong secondary
                @click="getArtistData">
                {{ isLoading ? '加载中' : '加载更多' }}
            </n-button>
        </div>
    </div>
</template>
<script lang='ts' setup>
// 钩子
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
// 接口
import type { ArtistAreaType, ArtistType } from '@/api/public/indexfaces';
import type { Artist } from '@/api/public/indexfaces'
// 数据
import { areaTypes, artistTypes, wordTypes } from './artistType'
// 组件
import ArtistCard from '@/components/Card/ArtistCard/ArtistCard.vue';
import SkeletonList from '@/components/SkeletonList/SkeletonList.vue';
// api
import { getRecArtist } from '@/api/Discover/Artists';
// 工具函数
import message from '@/utils/message';


// 路由信息
const $route = useRoute()
// 路由实例对象
const $router = useRouter()
// 地区类型
const areaType = ref<ArtistAreaType>(-1)
// 歌手类型
const artistType = ref<ArtistType>(-1)
// 字母类型
const wordType = ref<number | string>(-1)
// 筛选的格式化
const result = computed(() => {
    return areaTypes[areaTypes.findIndex(ele => ele.value === areaType.value)].name + artistTypes[artistTypes.findIndex(ele => ele.value === artistType.value)].name
})
// 歌手列表
const list = reactive<Artist[]>([])
// 正在加载
const isLoading = ref(true)
// 还有更多吗
const hasMore = ref(false)
// 正在重新加载
const isloadingAll = ref(true)

/**
 * 设置筛选歌手的类型
 * @param type 
 * @param value 
 */
function setType(type: "word" | "artist" | "area", value: string | number) {
    switch (type) {
        case 'word': wordType.value = value; break;
        case 'artist': artistType.value = value as any; break;
        case 'area': areaType.value = value as any; break;
    }
}

async function getArtistData() {
    isLoading.value = true
    try {
        const res = await getRecArtist(areaType.value, artistType.value, list.length, wordType.value)
        if (res.code !== 200) await Promise.reject()
        res.artists.forEach(ele => {
            list.push(ele)
        })
        hasMore.value = res.more
        isLoading.value = false
    } catch (error) {
        message("获取歌手列表失败 🤩", "warning")
    }
}

watch([areaType, wordType, artistType], async () => {
    list.length = 0
    isloadingAll.value = true
    await getArtistData()
    isloadingAll.value = false
})



onMounted(async () => {
    await getArtistData()
    isloadingAll.value = false
})

</script>