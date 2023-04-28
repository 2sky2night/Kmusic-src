<template>
    <div class="page">
         歌曲评论区
         {{ $route.params }}
    </div>
</template>
<script lang='ts' setup>
import { useRoute } from 'vue-router';
const $route=useRoute()
</script>
<style scoped>

</style>