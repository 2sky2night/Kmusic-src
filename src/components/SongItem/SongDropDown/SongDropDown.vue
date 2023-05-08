<template>
    <n-dropdown placement="bottom-start" trigger="manual" :x="x" :y="y" :options="options" :show="showDropdown"
        @select="handleSelect" @clickoutside="showDropdown = false" />
</template>

<script lang="ts" setup>
// 组件
import { NIcon } from "naive-ui";
// 图标
import { MessageOutlined as MessageOutlinedIcon } from '@vicons/antd'
import {
    IosMusicalNotes as IosMusicalNotesIcon,
    IosVideocam as IosVideocamIcon,
    MdPlayCircle as MdPlayCircleIcon,
    IosPlay as IosPlayIcon,
    IosArrowForward as IosArrowForwardIcon,
    MdFolderOpen as MdFolderOpenIcon
} from "@vicons/ionicons4";
// 工具函数
import PubSub from 'pubsub-js'
import message from "@/utils/message";
// 接口
import type { Song } from '@/api/public/indexfaces'
// 钩子
import { useRouter } from "vue-router";
import { ref, nextTick, h, reactive } from 'vue'
import useMusicStore from "@/store/music";
import useUserStore from '@/store/user'
// 渲染函数
import playlistPanel from '@/render/PlaylistPanel'


// 音乐仓库
const musicStore = useMusicStore()
// 用户仓库
const userStore = useUserStore()
// 路由实例
const $router = useRouter()

//  要渲染的内容
const options = reactive([
    {
        label: '立即播放',
        key: 'play-now',
        icon: () => h(NIcon, { size: 20 }, () => h(IosPlayIcon))
    },
    {
        label: '下一首播放',
        key: 'play-next',
        icon: () => h(NIcon, { size: 20 }, () => h(IosArrowForwardIcon))
    },
    {
        label: '添加到歌单',
        key: 'add-playlist',
        icon: () => h(NIcon, { size: 20 }, () => h(MdPlayCircleIcon))
    },
    {
        type: 'divider',
        key: 'd1'
    },
    {
        label: '歌曲详情',
        key: 'song-infor',
        icon: () => h(NIcon, { size: 20 }, () => h(IosMusicalNotesIcon))
    },
    {
        label: '歌曲专辑',
        key: 'song-album',
        icon: () => h(NIcon, { size: 20 }, () => h(MdFolderOpenIcon))
    },
    {
        label: '歌曲评论',
        key: 'song-comment',
        icon: () => h(NIcon, { size: 20 }, () => h(MessageOutlinedIcon))
    }
])

const mvOption = {
    label: '观看mv',
    key: 'mv',
    icon: () => h(NIcon, { size: 20 }, () => h(IosVideocamIcon))
}

const showDropdown = ref(false)
const x = ref(0)
const y = ref(0)

// 歌曲信息
let song: Song | {} = {}

/**
 * 选择某一项的回调
 * @param key 
 */
function handleSelect(key: string | number) {
    showDropdown.value = false;
    const data = (song as Song);
    switch (key) {
        case 'mv': $router.push(`/mv/${data.mv}`); break;
        case 'song-infor': $router.push(`/song/${data.id}`); break;
        case 'play-next': console.log('play-next'); break;
        case 'add-playlist': toAddPlaylist(); break;
        case 'play-now': toSetPlayingSong(); break;
        case 'song-album': $router.push(`/album/${data.al.id}`); break;
        case 'song-comment': $router.push(`/song-comment/${data.id}`); break;
    }
}

/**
 * 歌曲组件右键时发送消息,将歌曲数据传递给下拉菜单组件
 */
PubSub.subscribe('open', (_, res: { data: Song, x: number, y: number }) => {
    song = res.data
    // 获得数据后,检查是否有mv
    if (res.data.mv) {
        // 有mv就添加这一项数据 需要检查当前是否有mv,没有mv选项才添加
        if (options.findIndex(ele => ele.key === "mv") === -1)
            options.push(mvOption)
    } else {
        // 没有mv就删除mv选项
        options.some((ele, index) => {
            if (ele.key === 'mv') {
                options.splice(index, 1)
                return true
            }
        })
    }
    showDropdown.value = false
    nextTick().then(() => {
        showDropdown.value = true
        x.value = res.x
        y.value = res.y
    })
})

/**
 * 播放歌曲
 */
function toSetPlayingSong() {
    const data = song as Song
    // 将当前歌曲的数据发送给仓库中去,修改当前播放的歌曲信息
    musicStore.setPlayingSong({
        id: data.id,
        name: data.name,
        album: { name: data.al.name, id: data.al.id, picUrl: data.al.picUrl },
        artists: data.ar,
        isVip: data.privilege.freeTrialPrivilege.resConsumable
    })
}

/**
 * 歌曲添加到歌单
 */
function toAddPlaylist() {
    if (userStore.isLoginState) {
        playlistPanel((song as Song).id)
    } else {
        message("请先登录 👀", "info")
    }
}


</script>