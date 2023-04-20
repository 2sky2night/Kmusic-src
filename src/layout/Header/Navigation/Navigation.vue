<template>
    <ul class="navigation">
        <Navigate v-for="item in navigateList" :key="item.path" :title="item.title" :path="item.path"
            :children="item.children" :is-active="item.isActive" />
    </ul>
</template>
<script lang='ts' setup>
import Navigate from './Navigate/Navigate.vue';
import navigates from './navigates'
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router';
// 路由元信息
const $route = useRoute()
// 路由路径
const navigateList = reactive(navigates)

// 取消所有高亮效果
function disActiveAll() {
    navigateList.forEach(ele => {
        ele.isActive = false
    })
}

// 激活路由设置高亮效果
function activeHandler(path: string) {
    disActiveAll()
    const index = navigateList.findIndex(ele => ele.path === path)
    if (index !== -1) {
        // 若存在
        navigateList[index].isActive = true
    }
}

// 若当前路由路径不为导航项中的任意一个时,取消所有导航项的激活效果
// 访问二级路由,让对应的父级路由高亮
watch(() => $route.path, (v) => {
    // 获取当前路径的一级路由的路径
    const path = $route.matched.slice(0)[0].path

    // 若当前访问的二级路由包括了一级路由的路径,则让对应的一级路由高亮
    // 当然也包括了一级路由,点击了一级路由也会设置高亮.
    if (v.includes(path)) {
        activeHandler(path)
        return
    }
    disActiveAll()
    // const index = navigateList.findIndex(ele => ele.path === v)
    // if (index !== -1) {
    //     // 若当前跳转的路由是一级路由导航项里面的就设置高亮
    //     activeHandler(navigateList[index].path)
    // } else {
    // 否则就情况高亮效果
    // disActiveAll()
    // }
})

</script>
<style scoped lang="scss">
.navigation {
    display: flex;
}

// 小于370px时,缩小导航项的大小
@media screen and (max-width:400px) {
    :deep(li button) {
        font-size: 13px;
    }
}
</style>