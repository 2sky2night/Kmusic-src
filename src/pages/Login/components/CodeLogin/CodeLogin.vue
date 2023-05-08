<template>
    <div class="code-login-box">
        <span class="tips">{{ codeTips }}</span>
        <div class="code-box">
            <div class="code-out" v-if="codeData.code === 800 && codeData.unikey">
                二维码过期
            </div>
            <qrcode-vue v-if="codeData.unikey" :size="150" level="H" :background="themeStroe.theme ? '' : '#fff'"
                foreground="#4098fc" :value="`https://music.163.com/login?codekey=${codeData.unikey}`" />
        </div>
        <n-button v-if="codeData.code === 800 && codeData.unikey" size="small" @click="startCode">刷新二维码</n-button>
        <span class="tips">请打开云音乐&nbsp;APP&nbsp;扫码登陆</span>
        <n-button @click="loginWithout" size="small" style="font-size: 12px;">测试账户直接登陆😎</n-button>
    </div>
</template>
<script lang='ts' setup>
import useThemeStore from '@/store/theme'
import { useMessage } from 'naive-ui'
import QrcodeVue from 'qrcode.vue'
import CodeData from './interfaces'
import { getCodeState, getKeyCode, createCode } from '@/api/Login'
import { reactive, onMounted, computed, onUnmounted } from 'vue'
import useUserStore from '@/store/user'
import { useRouter } from 'vue-router'

// 获取主题仓库
const themeStroe = useThemeStore()

// 获取用户仓库
const userStore = useUserStore()

// 获取导航对象
const $router = useRouter()

// 计时器
let timer: any = null
// 组件的消息提示钩子
const message = useMessage()
// 二维码信息
const codeData = reactive<CodeData>({ unikey: '', code: 800, cookie: null })

// 二维码的提示信息
const codeTips = computed(() => {
    switch (codeData.code) {
        case 800: return '二维码过期或还没生成二维码'
        case 801: return '等待扫码'
        case 802: return '等待授权'
        case 803: return '登录成功'
    }
})

/**
 * 创建二维码
 */
async function toCreateKey() {
    try {
        // 获取二维码key值
        const resKey = await getKeyCode()

        if (resKey.data.code === 200) {
            codeData.unikey = resKey.data.unikey
        }
        else {
            Promise.reject()
        }
        // 根据key值创建二维码
        const resCode = await createCode(codeData.unikey)
        if (resCode.code !== 200) {
            Promise.reject()
        }
    }
    catch (error) {
        message.error("出错啦!!")
    }
}

/**
 * 获取二维码状态
 */
async function toGetCodeState() {
    try {
        const res = await getCodeState(codeData.unikey)
        if (res.code === 803) {
            // 获取cookies值
            codeData.cookie = res.cookie
            login()
        } else if (res.code === 800) {
            // 二维码过期的回调
            //  关闭计时器
            clearInterval(timer)
            timer = null
        }
        codeData.code = res.code
    } catch (error) {
        message.error("出错啦!!")
    }
}

//  登录成功的回调
function login() {
    message.success("登录成功!")
    //  登录成功关闭计时器
    clearInterval(timer)
    // 获取用户cookie值,并设置登录成功
    userStore.setCookie(codeData.cookie as string)
    // 设置登录状态为成功
    userStore.setLogin(true)
    // 将cookie保存在本地
    localStorage.setItem('cookie', codeData.cookie as string)
    // 跳转至用户页面
    $router.push('/my')
}

// 获取二维码,并开启轮询
async function startCode() {
    if (timer) {
        // 若开启了定时器应该取消上次的定时器
        console.log('清除定时器');
        clearInterval(timer)
    }
    try {
        await toCreateKey()
        await toGetCodeState()
        // 开启定时器每500ms获取扫码状态
        timer = setInterval(toGetCodeState, 1000)
    } catch (error) {
        message.error("出错啦!!")
    }

}

onMounted(startCode)

// 销毁定时器
onUnmounted(() => {
    clearInterval(timer)
})


// 直接登陆,将来需要被删除,只是测试哈.
function loginWithout() {
    const cookie = '_ga=GA1.1.1791282890.1681301868; _ga_MD3K4WETFE=GS1.1.1681301867.1.0.1681301871.0.0.0; MUSIC_U=2cd1c71b9baf7f53f26ef7f5dfe0de09ee0ec6254d4c74d3bbf95eea378226762db2b90205957188578daf23a96d51d11e3b34d47767323186dd7c53440873a002d144fc052de05ed4dbf082a8813684; __csrf=e752de12f1a9bee2096f705c5d6b749e; NMTID=00OSs5nHVx9OY_IK0RYgVlrPcc_SAQAAAGH-NCW4Q'
    message.success("登录成功!")
    //  登录成功关闭计时器
    clearInterval(timer)
    // 获取用户cookie值,并设置登录成功

    userStore.setCookie(cookie)
    // 设置登录状态为成功
    userStore.setLogin(true)
    // 将cookie保存在本地
    localStorage.setItem('cookie', cookie)
    // 跳转至用户页面
    $router.push('/my')
}

</script>
<style scoped lang="scss">
// 二维码过期的遮罩层
.code-out {
    text-align: center;
    line-height: 150px;
    width: 150px;
    font-weight: 600;
    height: 150px;
    background-color: var(--mask-hover-bg);
    position: absolute;
    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(1px);
}

.code-login-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .tips {
        font-size: 13px;
        margin: 10px 0;
    }

    .code-box {
        width: 150px;
        position: relative;
        height: 150px;
        display: flex;
        align-items: center;
        padding: 10px 20px;
    }
}
</style>