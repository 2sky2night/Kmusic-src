<template>
    <div class="page">
        专辑评论页面
        {{ $route.params }}
    </div>
</template>
<script lang='ts' setup>
import { useRoute } from 'vue-router'
const $route = useRoute()
</script>
<style scoped>

</style>