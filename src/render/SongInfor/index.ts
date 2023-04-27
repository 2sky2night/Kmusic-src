import { h, render } from 'vue'
import SongInfor from '@/components/SongInfor/SongInfor.vue'
import { Song } from '@/api/public/indexfaces'
import './songInfor.css'
/**
 * 弹出歌曲详情信息的抽屉
 */
const songInfor = (song: Song) => {
    // 创建容器
    const container = document.createElement("div")
    container.classList.add('song-infor-container')

    // 销毁容器
    const remove = () => {
        container.remove()
    }

    // 创建虚拟DOM
    const vnode = h(SongInfor, { song, closeHandler: remove })

    render(vnode, container)
    document.body.insertAdjacentElement("beforeend", container)



    // 给容器绑定事件处理函数
    container.addEventListener("click", () => {
        (vnode.component as any).exposed.toCloseDrawer()
    })
}

export default songInfor