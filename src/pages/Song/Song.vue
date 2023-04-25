<template>
    <div class="page">
        歌曲详情
        {{ $route.params }}
    </div>
</template>
<script lang='ts' setup>
import { useRoute } from 'vue-router';
const $route = useRoute()
</script>
<style scoped>

</style>