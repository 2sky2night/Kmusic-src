<template>
    <div class="page">

        <div class="mv-box" v-show="countLoadDone === 3" >
            <div class="mv-container">
                <MvInfor :id="+$route.params.id" @load-done="countDone" />
                <Comment :id="+$route.params.id" @load-done="countDone" />
            </div>
            <SimiMv :id="+$route.params.id" @load-done="countDone" />
        </div>

        <MvSkeleton v-show="countLoadDone !== 3" />
    </div>
</template>
<script lang='ts' setup>
import MvSkeleton from '@/components/PageSkeleton/MvSkeleton/MvSkeleton.vue';
import MvInfor from './components/MvInfor/MvInfor.vue';
import SimiMv from './components/SimiMv/SimiMv.vue';
import Comment from './components/Comment/Comment.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue';
// 当前加载好的组件
const countLoadDone = ref(0)

const $route = useRoute()


// 统计加载完成的组件
function countDone() {
    countLoadDone.value++
}

/**
 * 监听动态参数的变化,重置加载好的组件
 */
watch(() => $route.params, () => {
    countLoadDone.value=0
})

</script>
<style scoped>
.page {
    padding: 10px;
    padding-top: 20px;
}

.mv-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}
.page>div{
    display: flex;
}
@media screen and (max-width:1000px) {
    .page>div.mv-box{
    flex-direction: column;
}
}

</style>