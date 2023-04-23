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
    cursor: pointer;
    height: 50px;
    width: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;

    span:first-child {
        font-size: 20px;
    }
}

@media screen and (max-width:585px) {
    li {
        height: 30px;
        span:first-child {
            font-size: 15px !important;
        }
        font-size: 12px;
    }
}
</style>