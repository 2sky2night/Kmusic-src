import { h, render } from 'vue'
import './playlistPanel.css'
import PlaylistPanel from '@/components/PlaylistPanel/PlaylistPanel.vue'

/**
 * 渲染歌曲添加到歌单组件
 * @param songId 要添加歌曲的id
 */
const playlistPanel = (songId: number) => {
    // 容器
    const container = document.createElement("div");
    container.classList.add('model-container');

    const vnode = h(PlaylistPanel, { songId, render: false, closePanel });

    function closePanel() {
        (vnode.component as any).exposed.isShow.value=false;
        setTimeout(() => {
            container.remove()
        }, 400)
    }

    container.addEventListener("click",closePanel)

    render(vnode, container);

    document.body.insertAdjacentElement("beforeend", container)

}

export default playlistPanel