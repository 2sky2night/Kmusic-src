<template>
  <Transition name="msg" appear>
    <div v-if="isShow" class="msg-box"
      :style="{ top: isFirst ? 'unset' : currentOffset.y + 'px', left: isFirst ? 'unset' : currentOffset.x + 'px' }">
      <div class="msg-top-bar" @pointerdown="tapTopBar" ref="topBar">
        <span>{{ title }}</span>
        <button  @click="toCloseBox(false)">
          <n-icon size="20">
            <CloseIcon/>
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
        <button @click="toCloseBox(false)">取消</button>
        <button @click="toCloseBox(true)">确认</button>
      </div>
    </div>
  </Transition>
</template>
<script lang='ts' setup>
import { IosWarning as IosWarningIcon } from '@vicons/ionicons4'
import { Close as CloseIcon } from '@vicons/ionicons5'
import { onMounted, reactive, ref } from 'vue';
// 控制模态框的显示和隐藏
const isShow = ref(true)
const topBar = ref<HTMLElement | null>(null)
// 第一次时居中展示
const isFirst = ref<boolean>(true)

// 暴露出的数据源
defineExpose({ isShow })

// 鼠标在容器里面的坐标
const clientOffset = {
  x: 0,
  y: 0
}

// 计算后的偏移量
const currentOffset = reactive({
  x: 0,
  y: 0
})

interface MsgBoxProps {
  title: string;
  content: string;
  closeWindow: (flag: boolean) => void,
}

const props = defineProps<MsgBoxProps>()

function tapTopBar(e: MouseEvent) {
  // 鼠标在容器里面的坐标
  clientOffset.x = e.offsetX;
  clientOffset.y = e.offsetY;

  // 鼠标点击并移动时绑定事件
  (topBar.value as HTMLElement).addEventListener("mousemove", moveModal);
}

// 鼠标抬起时解绑事件
onMounted(() => {
  (topBar.value as HTMLElement).addEventListener("pointerup", () => {
    (topBar.value as HTMLElement).removeEventListener("mousemove", moveModal)
  });
  (topBar.value as HTMLElement).addEventListener("mouseleave", () => {
    (topBar.value as HTMLElement).removeEventListener("mousemove", moveModal)
  })
})

// 移动模态框
function moveModal(e: MouseEvent) {
  if (isFirst.value) {
    isFirst.value = false
  }

  // 计算出当前的偏移量
  currentOffset.x = e.pageX - clientOffset.x;
  currentOffset.y = e.pageY - clientOffset.y;
}

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
  cursor: move;
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
  color:var(--text-color);
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

.msg-btns>button {
  border: none;
  padding: 5px 15px;
  border-radius: 10px;
  cursor: pointer;
}

.msg-btns>button:nth-child(2) {
  margin-left: 10px;
  background-color: rgb(64, 158, 255);
  color: white;
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