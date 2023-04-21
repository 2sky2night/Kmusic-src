<template>
    <div class="code-login-box">
        <span class="tips">{{ codeTips }}</span>
        <div class="code-box">
            <qrcode-vue v-if="codeData.unikey" :size="150" level="H" foreground="#4098fc"
                :value="`https://music.163.com/login?codekey=${codeData.unikey}`" />
        </div>
        <span class="tips">请打开云音乐&nbsp;APP&nbsp;扫码登陆</span>
    </div>
</template>
<script lang='ts' setup>
import { useMessage } from 'naive-ui'
import QrcodeVue from 'qrcode.vue'
import CodeData from './interfaces'
import { getCodeState, getKeyCode, createCode } from '../../../../api/Login'
import { reactive, onMounted, computed, onUnmounted } from 'vue'

// 计时器
let timer: any = null
// 组件的消息提示钩子
const message = useMessage()
// 二维码信息
const codeData = reactive<CodeData>({ unikey: '', code: 800 })

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
        switch (res.code) {
            case 800: message.error("二维码过期!"); break;
            case 801: message.warning("等待扫码!"); break;
            case 802: message.info("等待授权!"); break;
            case 803: login(); break;
        }
        codeData.code = res.code
    } catch (error) {
        message.error("出错啦!!")
    }
}

//  登录成功的回调
function login() {
    message.success("登录成功!")
}

// 二维码过期的回调


onMounted(async () => {
    try {
        await toCreateKey()
        // 开启定时器每500ms获取扫码状态
        timer = setInterval(toGetCodeState, 5000)
    } catch (error) {
        message.error("出错啦!!")
    }

})

// 销毁定时器
onUnmounted(() => {
    clearInterval(timer)
})


</script>
<style scoped lang="scss">
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
        height: 150px;
        display: flex;
        align-items: center;
        padding: 10px 20px;
    }
}
</style>