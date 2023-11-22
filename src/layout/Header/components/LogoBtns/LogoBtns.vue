<template>
    <div class="logo-btns">
        <n-space align="center">
            <div class="logo">
                <svg @click="toHome" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true" role="img" class="iconify iconify--logos" width="37.07" height="36"
                    preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 198">
                    <path fill="#41B883" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0h47.36Z"></path>
                    <path fill="#41B883" d="m0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0H0Z"></path>
                    <path fill="#35495E" d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0H50.56Z"></path>
                </svg>
            </div>
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
function toHome() {
    $router.push('/')
}
</script>
<style scoped lang="scss">
.logo-btns {
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

.logo svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
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