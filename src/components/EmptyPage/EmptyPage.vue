<template>
    <n-empty :description="description" size="large" style="margin-top: 30px;font-size: 20px;">
        <template #extra v-if="showBtn">
            <n-button  strong secondary @click="$router.push('/')">
                看看别的 ?
            </n-button>
        </template>
    </n-empty>
</template>
<script lang='ts' setup>
withDefaults(defineProps<{
    showBtn: boolean;
    description: string;
}>(), {
    showBtn: true,
    description: '这一页没有内容呢 😅'
})
</script>
