<template>
    <div class="music-list recommend-album">
        <TitleHeader title="新碟上架" />
         <SkeletonList v-if="isLoading" :cover-radius="10" :length="12" :text-center="false" />
        <ul>
            <AlbumCard 
                v-for="item in list"
                :artists="item.artists"
                :id="item.id"
                :pic-url="item.picUrl"
                :name="item.name"
                :key="item.id"
                :sub-time="item.publishTime as number"
            />
        </ul>
    </div>
</template>
<script lang='ts' setup>
import TitleHeader from '../TitleHeader/TitleHeader.vue';
import { getNewAlbum } from '@/api/Home';
import type { Album } from '@/api/public/indexfaces';
import { reactive,onMounted,ref } from 'vue';

const list = reactive<Album[]>([])
const isLoading = ref(true)

onMounted(async () => {
    const res =await getNewAlbum()
    if (res.code === 200) {
        res.albums.forEach(ele => {
            list.push(ele)
        })
        isLoading.value=false
    }
})

</script>
