<template>
    <Transition appear name="message">
        <div class="message-box-without" v-if="isShow" @click.stop="">
            <!--没有状态的消息盒子-->
            <div class="box-top-bar">
                <span>{{ title }}</span>
                <NIcon @click="closeBox" size="30">
                    <IosClose />
                </NIcon>
            </div>
            <div>{{ content }}</div>
        </div>
    </Transition>
</template>
<script lang='ts' setup>
import { IosClose } from '@vicons/ionicons4'
import { NIcon } from 'naive-ui'
import { ref } from 'vue'
const isShow = ref(true)
const props = defineProps<{ title: string; content: string, closeBox: () => void }>()
defineExpose({ isShow })
</script>
<style scoped lang="scss">
.message-box-without {
    width: 70%;
    color: var(--text-color);
    background-color: var(--bg-box-color);
    box-sizing: border-box;
    padding: 10px 20px;
    padding-top: 0;
    font-size: 13px;
    border-radius: 5px;
    word-break: break-all;

    .box-top-bar {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
            font-size: 20px;
        }

        i {
            cursor: pointer;
            transition: .5s;
        }

        i:hover {
            color: var(--text-hover)
        }
    }
}

.message-enter-active {
    animation: message .5s 1 ease-in-out;
}

.message-leave-active {
    animation: message .5s 1 ease-in-out reverse;
}

@keyframes message {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0px);
    }
}
</style>