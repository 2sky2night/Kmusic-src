<template>
    <ul>
        <n-skeleton height="80px" style="margin: 10px 0;" width="100%" v-for="(item, index) in Array.from({ length })" :key="index" />
    </ul>
</template>
<script lang='ts' setup>
const props = defineProps<{ length: number }>()
</script>