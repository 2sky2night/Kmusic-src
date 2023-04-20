<template>
    <n-dropdown trigger="click" :options="option" @select="handleSelect">
        <!--用户头像需要从仓库中获取-->
        <n-avatar round :size="40" src="https://p4.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg" />
    </n-dropdown>
</template>
<script lang='ts' setup>
import { reactive } from 'vue'
import options from './options'
const option = reactive(options)

// 点击某一项时的回调,可以根据v的值来执行对应的事情.
function handleSelect(v: string) {
    console.log(v);
}

</script>
<style scoped>
div {
    align-items: center;
    cursor: pointer;
    user-select: none;
}
</style>