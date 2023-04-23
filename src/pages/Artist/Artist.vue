<template>
    <div class="page">
        <n-h1>艺人详情页</n-h1>
        <n-h2>{{ params }}</n-h2>
    </div>
</template>
<script lang='ts' setup>
import useRouteInfor from '@/hooks/useRouteInfor';
const {params} = useRouteInfor()
</script>
<style scoped>

</style>