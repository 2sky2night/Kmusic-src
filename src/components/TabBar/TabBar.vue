<template>
    <n-tabs type="segment" @update:value="changeHandler" v-model:value="selectPanel" style="margin: 10px 0;">
        <n-tab v-for="item in list" :name="item.path" v-text="item.title" />
    </n-tabs>
</template>
<script lang='ts' setup>
import TabBarList from './interfaces'
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const props = defineProps<{ list: TabBarList }>()

// 根据当前路由路径来初始化选择的标签页
const $route = useRoute()
const $router = useRouter()
// 当前选择的标签页
const selectPanel = ref($route.path)

// 标签页切换时的回调
function changeHandler(value: string) {
    // 路由跳转
    $router.push(value)
    // 设置当前选择的标签
    selectPanel.value = value
}

// 路由路径发生变化改变选择的标签页  (还可以优化,我这个只要路由发生变化就执行回调)
watch($route, (vNew) => {

    // 获取当前路由路径的组件
    const pathList = vNew.path.split('/')

    if (pathList.length === 4) {
        // 若该路由有动态参数 去除多余的动态参数
        pathList.pop()
    }

    // 去除多余的路径,我们只要二级路由
    pathList.splice(0, 2)

    // 假定我们这个组件只用在一级路由里面,来控制二级路由的切换的话这个解决方式是ok的
    props.list.some(ele => {
        if (ele.path.includes(pathList[0])) {
            selectPanel.value = ele.path
        }
    })


})

</script>

