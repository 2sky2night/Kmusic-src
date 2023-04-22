<template>
    <li>
        <span>{{ value }}</span>
        <span>{{ title }}</span>
    </li>
</template>
<script lang='ts' setup>
import { useRouter } from 'vue-router'
const $router = useRouter()
const props = defineProps<{ title: string; value: number }>()
</script>
<style scoped lang="scss">
li {
    height: 50px;
    width: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;

    span:first-child {
        font-size: 20px;
    }
}
</style>