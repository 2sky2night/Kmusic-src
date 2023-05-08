<template>
    <transition name="img" appear>
        <div class="preview-photo" v-if="isShow">
            <img :src="imgSrc" @click.stop="" :style="{ transform: `scale(${scale})` }">
        </div>
    </transition>
    <div @click.stop="" class="btns">
        <NButton strong secondary title="放大" @click="scale = scale + 0.1">
            <NIcon :size="30" color="#61afef">
                <IosAddCircleOutline />
            </NIcon>
        </NButton>
        <NButton strong secondary title="缩小" @click="scale = scale - 0.1">
            <NIcon :size="30" color="#61afef">
                <IosRemoveCircleOutline />
            </NIcon>
        </NButton>
        <NButton strong secondary title="关闭" @click="closeHandler">
            <NIcon :size="30" color="#61afef">
                <IosCloseCircleOutline />
            </NIcon>
        </NButton>
    </div>
</template>
<script lang='ts' setup>
// 钩子
import { ref, watch } from 'vue'
// 组件
import { NButton, NIcon } from 'naive-ui';
// 图标
import { IosAddCircleOutline, IosCloseCircleOutline, IosRemoveCircleOutline } from '@vicons/ionicons4'

const scale = ref(1)
const isShow = ref(true)
const props = defineProps<{
    imgSrc: string;
    closeHandler: () => void
}>();
// 暴露出isShow,让渲染函数可以操作动画
defineExpose({ isShow })
watch(scale, (v) => {
    if (v <= 0) {
        scale.value = 1
    }
})
</script>
<style scoped>
.preview-photo {
    width: 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
}

img {
    width: 100%;
    object-fit: contain;
    height: 100%;
    z-index: 10000;
    transition: .5s;
}

.img-enter-active {
    animation: imgMove .3s ease-in-out 1;
}

.btns {
    position: absolute;
    bottom: 10%;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 10001;
}

.img-leave-active {
    animation: imgMove .3s ease-in-out 1 reverse;
}

@keyframes imgMove {
    from {
        opacity: 0;
        transform: scale(.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>