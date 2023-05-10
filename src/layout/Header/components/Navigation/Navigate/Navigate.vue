<template>
    <li :style="{display:isShow?'block':'none'}">

        <Button  @click="navigateTo" :title="title" v-if="children.length === 0" :type="isActive ? 'primary' : 'info'" />

        <n-dropdown v-else trigger="hover" :options="children" @select="handleSelect">
            <Button @click="navigateTo" :title="title" :type="isActive ? 'primary' : 'info'" />
        </n-dropdown>

    </li>
</template>
<script lang='ts' setup>
// 二级路由的类型
import type { NavChildren } from '../navigates'
import Button from '@/components/Button/Button.vue';
import { useRouter } from 'vue-router'
// 要渲染的一级路由的类型
interface NavProps {
    title: string,
    path: string,
    isActive: boolean
    children: NavChildren[],
    isShow:boolean
}
// 自定义属性
const props = defineProps<NavProps>()

// 路由对象
const $router = useRouter()


/**
 * 点击一级路由让其高亮并进行路由跳转
 */
function navigateTo() {
    $router.push(props.path)
}

/**
 * 点击子路由后进行路由跳转
 */
function handleSelect(path: string) {
    $router.push(path)
}

</script>
<style scoped>
li {
    margin-right: 5px;
}
</style>