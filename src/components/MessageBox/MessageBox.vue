<template>
  <Transition name="msg" appear>
    <div v-if="isShow" class="msg-box">
      <div class="msg-top-bar" ref="topBar">
        <span>{{ title }}</span>
        <button @click="toCloseBox(false)">
          <n-icon size="20">
            <CloseIcon />
          </n-icon>
        </button>
      </div>
      <div class="msg-container">
        <n-icon color="#e6a23c" size="25" style="position: relative;top:5px">
          <IosWarningIcon />
        </n-icon>
        <span>{{ content }}</span>
      </div>
      <div class="msg-btns">
        <NButton style="margin-right: 10px;" strong secondary size="small" @click="toCloseBox(false)">取消</NButton>
        <NButton strong secondary size="small" @click="toCloseBox(true)" type="info">确认</NButton>
      </div>
    </div>
  </Transition>
</template>
<script lang='ts' setup>
import { NButton } from 'naive-ui';
import { IosWarning as IosWarningIcon } from '@vicons/ionicons4'
import { Close as CloseIcon } from '@vicons/ionicons5'
import { ref } from 'vue';
// 控制模态框的显示和隐藏
const isShow = ref(true)
const topBar = ref<HTMLElement | null>(null)

// 暴露出的数据源
defineExpose({ isShow })


interface MsgBoxProps {
  title: string;
  content: string;
  closeWindow: (flag: boolean) => void,
}

const props = defineProps<MsgBoxProps>()

/**
 * 关闭模态框
 * @param flag  - 以什么状态关闭的?
 */
function toCloseBox(flag: boolean) {
  props.closeWindow(flag)
}

</script>

<style scoped>
.msg-top-bar {
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  border: unset;
}

.msg-top-bar span {
  font-weight: 600;
  font-size: 16px;
}

.msg-top-bar button {
  background-color: unset;
  border: none;
  width: 20px;
  cursor: pointer;
  color: rgb(200, 200, 200);
}

.msg-top-bar button:hover {
  color: rgb(170, 170, 170);
}

.msg-box {
  color: var(--text-color);
  padding: 0 20px;
  user-select: none;
  border-radius: 3px;
  position: absolute;
  background-color: var(--bg-box-color);
  min-height: 100px;
  width: 300px;
  padding-bottom: 10px;
}

.msg-btns {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.msg-enter-active {
  animation: msg .5s ease-in-out;
}

.msg-leave-active {
  animation: msg .5s ease-in-out reverse;
}

@keyframes msg {
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