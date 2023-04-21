import { h, render } from 'vue'
import MessageBox from '@/components/MessageBox/MessageBox.vue'
import './messagebox.css'

/**
 * 打开弹窗
 * @param content - 消息文本
 * @param title - 消息的标题
 * @returns  - 返回promise对象,表示本次弹窗关闭的状态
 */
function messagebox(content: string, title: string = '消息') {
  return new Promise((resolve, reject) => {

    const container = document.createElement("div")

    container.classList.add("kg-msg-box-container")

    // 按下遮罩层关闭模态框(单击不行,单击包括了按下和弹起)
    container.addEventListener("pointerdown", (e: MouseEvent) => {
      // 若点击了容器组件才关闭模态框(由于事件冒泡会触发容器组件的click事件)
      if (e.target === container) {
        closeWindow(false)
      }
    })

    const vnode = h(MessageBox, { title, content, closeWindow })

    render(vnode, container)

    document.body.insertAdjacentElement("beforeend", container)

    // 关闭弹窗
    function closeWindow(flag: boolean) {
      // 执行动画效果
      (vnode.component as any).exposed.isShow.value=false
      // 动画执行完成再关闭模态框
      setTimeout(() => {
        flag ? resolve('ok') : reject("cancel")
        // 销毁容器
        container.remove()
      }, 600)
    }

  })

}

export default messagebox