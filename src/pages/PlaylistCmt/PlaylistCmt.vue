<template>
    <div class="page">
        <h1>歌曲评论页</h1>
        {{ $route.params }}
    </div>
</template>
<script lang='ts' setup>
import { useRoute } from 'vue-router';
const $route = useRoute()
</script>
<style scoped>

</style>