<template>
    <div class="page">
        <Banner />
        <DailSong v-if="userStore.isLogin&&userStore.cookie" />
        <RePlaylist />
        <ReSong />
        <ReArtist />
        <NewAlbum />
        <ReMv />
    </div>
</template>
<script lang='ts' setup>
import Banner from './components/Banner/Banner.vue'
import RePlaylist from './components/RePlaylist/RePlaylist.vue'
import ReMv from './components/ReMv/ReMv.vue';
import ReSong from './components/ReSong/ReSong.vue';
import ReArtist from './components/ReArtist/ReArtist.vue';
import NewAlbum from './components/NewAlbums/NewAlbum.vue'
import DailSong from './components/DailSong/DailSong.vue';
import useUserStore from '@/store/user';
const userStore = useUserStore()

</script>
<style scoped>
.page {
    box-sizing: border-box;
    padding: 0 10px;
    padding-top: 20px;
}
</style>