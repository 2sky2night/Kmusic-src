<template>
    <n-dropdown trigger="click" :options="option" @select="handleSelect">
        <!--用户头像需要从仓库中获取-->
        <n-avatar round :size="40" :src="userStore.userData.avatar" />
    </n-dropdown>
</template>
<script lang='ts' setup>
import message from '@/utils/message'
import messagebox from '@/render/MessageBox'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import useUserStore from '@/store/user'
import { loginMenu, unLoginMenu } from './options'
// 获取用户仓库
const userStore = useUserStore()
// 初始化渲染菜单栏
const option: any = reactive(userStore.cookie && userStore.isLogin ? Object.assign([], loginMenu) : Object.assign([], unLoginMenu))
// 获取路由对象
const $router = useRouter()


// 点击某一项时的回调,可以根据v的值来执行对应的事情.
function handleSelect(v: string) {
    switch (v) {
        case 'login': $router.push('/login'); break;
        case 'logout': logout(); break;
        case 'remmon': $router.push('/daily-song'); break;
        case 'history': $router.push('/history'); break;
    }
}

// 登出的回调
async function logout() {
    try {
        await messagebox('真的要退出吗?', '提示')
        // 退出登陆
        userStore.toLogout()
        // 返回首页
        $router.push('/')
    } catch (error) {
        message('取消登出 👀', 'info')
    }

}

// 监听仓库数据源的更新
userStore.$subscribe((_, state) => {
    // 清空菜单栏
    option.splice(0, option.length)
    if (state.cookie && state.isLogin) {
        // 登录了
        loginMenu.forEach(ele => {
            option.push(ele)
        })
    } else {
        // 未登录
        unLoginMenu.forEach(ele => {
            option.push(ele)
        })
    }
})

</script>
<style scoped>
div {
    align-items: center;
    cursor: pointer;
    user-select: none;
}
</style>