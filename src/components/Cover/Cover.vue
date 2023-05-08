<template>
    <div class="cover-img">
        <img :src="img" class="cover">
         <!-- <n-image :src="img" class="cover" style="border-radius: 10px;"/> -->
        <img class="album" src="../../assets/img/album.png">
    </div>
</template>
<script lang='ts' setup>
defineProps<{img:string}>()
</script>
<style scoped>
.cover-img{
    position: relative;
    width: 100%;
    height: 100%;
}
img.cover{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
}
.album{
    position: absolute;
    width: 35px !important;
    height: 100% !important;
}
</style>