<template>
    <div class="page">
        <img width="80" src="../../assets/vue.svg">
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
import CodeLogin from './components/CodeLogin/CodeLogin.vue'
</script>
<style scoped>
.page {
    padding-top: 50px;
    user-select: none;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.tips {
    height: 200px;
    justify-content: center;
    align-items: center;
    display: flex;
}
</style>