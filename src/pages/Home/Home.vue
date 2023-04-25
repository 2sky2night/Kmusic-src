<template>
    <div class="page">
        <Banner/>
        <RePlaylist/>
        <ReMv/>
    </div>
</template>
<script lang='ts' setup>
import Banner from './components/Banner/Banner.vue'
import RePlaylist from './components/RePlaylist/RePlaylist.vue'
import ReMv from './components/ReMv/ReMv.vue';
</script>
<style scoped>
.page{
    box-sizing: border-box;
    padding:0 10px;
    padding-top: 20px;
}
</style>