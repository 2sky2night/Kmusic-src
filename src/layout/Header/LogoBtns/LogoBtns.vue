<template>
    <div class="logo-btns">
        <n-space align="center">
            <img src="../../../assets/vue.svg">
            <button @click="navigate(false)">
                <n-icon size="20">
                    <IosArrowBack />
                </n-icon>
            </button>
            <button @click="navigate(true)">
                <n-icon size="20">
                    <IosArrowForward />
                </n-icon>
            </button>
        </n-space>
    </div>
</template>
<script lang='ts' setup>
import { useRouter } from 'vue-router'
import { IosArrowBack, IosArrowForward } from '@vicons/ionicons4'
const $router = useRouter()
/**
 * 控制页面的前进和后退
 * @param value  - 真前进假后退
 */
function navigate(value: boolean) {
    value ? $router.forward() : $router.back()
}
</script>
<style scoped lang="scss">
.logo-btns{
    flex-grow: 1;
}
button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    transition: .3s;
    color: var(--text-color);
    background-color: var(--bg-btn-color);
}

button:hover {
    background-color: var(--hover-bg-color);
}

img {
    width: 30px;
    height: 30px;
}

// 在610px以下隐藏前进后退
@media screen and (max-width:630px) {
    button {
        display: none;
    }
}

// 在360px以下隐藏所有
@media screen and (max-width:350px) {
    :deep() {
        display: none;
    }
}
</style>