<template>
    <n-dropdown trigger="click" :options="option" @select="handleSelect">
        <!--用户头像需要从仓库中获取-->
        <n-avatar round :size="40" src="https://p4.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg" />
    </n-dropdown>
</template>
<script lang='ts' setup>
import messagebox from '@/render/MessageBox'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import options from './options'
import useUserStore from '@/store/user'
import { loginMenu, unLoginMenu } from './options'
// 获取配置项
const option: any = reactive(options)
// 获取路由对象
const $router = useRouter()
// 获取用户仓库
const userStore = useUserStore()

// 点击某一项时的回调,可以根据v的值来执行对应的事情.
function handleSelect(v: string) {
    console.log(v);
    switch (v) {
        case 'login': $router.push('/login'); break;
        case 'logout': logout(); break;
        default: console.log('点击了某一项');
    }
}

// 登出的回调
async function logout() {
    try {
        await messagebox('真的要退出吗?', '提示')
        // 重置仓库信息 reset方法不生效???
        userStore.setCookie(null)
        userStore.setLogin(false)
        // 清空本地数据
        localStorage.clear()
        // 返回首页
        $router.push('/')
    } catch (error) {
        (window as any).$message.info('取消登出 👀')
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