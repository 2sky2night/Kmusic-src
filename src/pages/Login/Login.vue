<template>
    <div class="page">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
            class="iconify iconify--logos" width="37.07" height="36" preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 256 198">
            <path fill="#41B883" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0h47.36Z"></path>
            <path fill="#41B883" d="m0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0H0Z"></path>
            <path fill="#35495E" d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0H50.56Z"></path>
        </svg>
        <n-h1 style="text-align: center;font-weight: 700;margin-top: 20px;">
            登录云音乐
        </n-h1>
        <n-tabs type="segment" animated style="max-width: 500px;">
            <n-tab-pane name="code" tab="二维码登录">
                <CodeLogin />
            </n-tab-pane>
            <n-tab-pane name="phone" tab="手机号登录">
                <div class="tips">
                    接口暂未提供😎
                </div>
            </n-tab-pane>
            <n-tab-pane name="email" tab="邮箱登录">
                <div class="tips">
                    接口暂未提供😎
                </div>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>
<script lang='ts' setup>
// 组件
import CodeLogin from './components/CodeLogin/CodeLogin.vue'
</script>
<style scoped lang="scss">
.page {
    padding-top: 50px;
    user-select: none;
    display: flex;
    align-items: center;
    flex-direction: column;

    svg {
        width: 80px;
        height: 80px;
    }
}

.tips {
    height: 200px;
    justify-content: center;
    align-items: center;
    display: flex;
}

@media screen and (max-height:700px) {
    .page {
        padding-top: 20px;
    }
}</style>