import { h, render } from 'vue'
import './previewPhoto.css'
import PreviewPhoto from '@/components/PreviewPhoto/PreviewPhoto.vue'
/**
 * 预览图片组件
 * @param imgSrc - 图片的地址
 */
const previewPhtot = (imgSrc: string) => {
    // 创建容器
    const container = document.createElement('div');
    container.classList.add("model-container")

    // 创建虚拟DOM
    const vnode = h(PreviewPhoto, { imgSrc, closeHandler: remove });

    //  将虚拟DOM渲染成真实DOM
    render(vnode, container)

    // 销毁容器
    function remove() {
        // 执行动画效果
        (vnode.component as any).exposed.isShow.value = false;
        setTimeout(() => {
            container.remove()
        }, 350)
    }

    container.addEventListener("click", remove)


    // 将容器元素挂载到body中去
    document.body.insertAdjacentElement("beforeend", container)
}

export default previewPhtot