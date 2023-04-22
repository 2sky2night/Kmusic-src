<template>
    <n-tabs type="segment" @update:value="changeHandler" v-model:value="selectPanel" style="margin: 10px 0;">
        <n-tab v-for="item in list" :name="item.path" v-text="item.title"  />
    </n-tabs>
</template>
<script lang='ts' setup>
import TabBarList from './interfaces'
import { ref } from 'vue'
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
</script>

