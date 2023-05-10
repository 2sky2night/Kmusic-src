<template>
    <div class="code-login-box">
        <span class="tips">{{ codeTips }}</span>
        <div class="code-box">
            <div class="code-out" v-if="codeData.code === 800 && codeData.unikey">
                二维码过期
            </div>
            <qrcode-vue v-if="codeData.unikey" :size="150" level="H" background="#fff" foreground="#4098fc"
                :value="`https://music.163.com/login?codekey=${codeData.unikey}`" />
        </div>
        <n-button v-if="codeData.code === 800 && codeData.unikey" size="small" @click="startCode">刷新二维码</n-button>
        <span class="tips">请打开云音乐&nbsp;APP&nbsp;扫码登陆</span>
    </div>
</template>
<script lang='ts' setup>
import { useMessage } from 'naive-ui'
import QrcodeVue from 'qrcode.vue'
import CodeData from './interfaces'
import { getCodeState, getKeyCode, createCode } from '@/api/Login'
import { reactive, onMounted, computed, onUnmounted } from 'vue'
import useUserStore from '@/store/user'
import { useRouter } from 'vue-router'

// 获取用户仓库
const userStore = useUserStore()

// 获取导航对象
const $router = useRouter()

// 计时器
let timer: any = null
// 组件的消息提示钩子
const message = useMessage()
// 二维码信息
const codeData = reactive<CodeData>({ unikey: '', code: 800, cookie: null, username: null })

// 二维码的提示信息
const codeTips = computed(() => {
    switch (codeData.code) {
        case 800: return '二维码过期或还没生成二维码'
        case 801: return '等待扫码'
        case 802: return `${codeData.username} 等待授权`
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
            await Promise.reject()
        }
        // 根据key值创建二维码
        const resCode = await createCode(codeData.unikey)
        if (resCode.code !== 200) {
            await Promise.reject()
        }
    }
    catch (error) {
        message.error("创建二维码失败 😋")
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
            //  关闭计时器 清空用户名等其他信息
            clearInterval(timer);
            timer = null;
            codeData.username = null
            codeData.code = 800;
            codeData.cookie = '';
        } else if (res.code === 802) {
            // 等待用户确认授权
            codeData.username = res.nickname;
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