<template>
    <n-dropdown placement="bottom-start" trigger="manual" :x="x" :y="y" :options="options" :show="showDropdown"
        @select="handleSelect" @clickoutside="showDropdown = false" />
</template>

<script lang="ts" setup>
import { NIcon } from "naive-ui";
import {
    IosMusicalNotes as IosMusicalNotesIcon,
    IosVideocam as IosVideocamIcon,
    MdPlayCircle as MdPlayCircleIcon,
    IosPlay as IosPlayIcon,
    IosArrowForward as IosArrowForwardIcon
} from "@vicons/ionicons4";
import { ref, nextTick, h, reactive } from 'vue'
import PubSub from 'pubsub-js'
import { Song } from '@/api/public/indexfaces'
import { useRouter } from "vue-router";
import useMusicStore from "@/store/music";

const musicStore = useMusicStore()

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
        label: '歌曲详情页',
        key: 'song-infor',
        icon: () => h(NIcon, { size: 20 }, () => h(IosMusicalNotesIcon))
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
        case 'add-playlist': console.log('add-playlist'); break;
        case 'play-now': toSetPlayingSong(); break;
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
        if(options.findIndex(ele=>ele.key==="mv")===-1)
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
        isVip:data.privilege.freeTrialPrivilege.resConsumable
    })
}



</script>