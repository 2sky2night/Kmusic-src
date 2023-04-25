<template>
    <ul>
        <SkeletonCard :text-center="textCenter" 
        :cover-radius="coverRadius"
         v-for="(item, index) in Array.from({ length })" :key="index" />
    </ul>
</template>
<script lang='ts' setup>
import SkeletonCard from '@/components/Card/SkeletonCard/SkeletonCard.vue';
const props = withDefaults(defineProps<{ length: number; coverRadius: number;textCenter:boolean }>(), {
    coverRadius: 8,
    textCenter:false
})
</script>