<template>
    <ul>
        <SkeletonCard v-for="(item, index) in Array.from({ length })" :key="index" />
    </ul>
</template>
<script lang='ts' setup>
import SkeletonCard from '../SkeletonCard/SkeletonCard.vue';
const props = defineProps<{ length: number }>()
</script>