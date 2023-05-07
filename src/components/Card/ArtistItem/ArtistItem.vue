<template>
    <li class="artsit-item" >
        <img :src="url" v-if="url">
        <span class="text" @click.stop="goToArtist">{{ name }}</span>
    </li>
</template>
<script lang='ts' setup>
import { useRouter } from 'vue-router'
const $router = useRouter()

const props = defineProps<{
    id: number;
    name: string;
    url: string|null;
}>()

function goToArtist() {
    $router.push(`/artist/${props.id}`)
}
</script>
<style scoped lang="scss">
.artsit-item {
    display: flex;
    align-items: center;
    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    span{
        margin: 0 3px;
    }
}
</style>