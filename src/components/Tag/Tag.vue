<template>
    <n-tag :type="typeString" :size="size" :round="round">
        {{ title }}
    </n-tag>
</template>
<script lang='ts' setup>

const type = Math.floor(Math.random() * 6 + 1)
let typeString = ''
switch (type) {
    case 1: typeString = 'default'; break;
    case 2: typeString = 'primary'; break;
    case 3: typeString = 'info'; break;
    case 4: typeString = 'success'; break;
    case 5: typeString = 'warning'; break;
    case 6: typeString = 'error'; break;
}

const props = defineProps<{
    size: 'small' | 'medium' | 'large';
    round: boolean;
    title: string;
}>()

</script>
<style scoped></style>