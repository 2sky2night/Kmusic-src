<template>
    <div>
        {{ musicStore.playingSong.name }}
    </div>
</template>
<script lang='ts' setup>
import useMusicStore from '@/store/music';
const musicStore = useMusicStore()



</script>
<style scoped>

</style>