import { defineStore } from "pinia";
import store from '@/store'
import { PlayingSongData } from "./interfaces";
import message from "@/utils/message";
import { h } from "vue";
import { NIcon } from "naive-ui";
import { IosMusicalNote } from '@vicons/ionicons4'

const data: { playingSong: PlayingSongData } = {
    playingSong: { id: null, isPlaying: false, name: '', src: '', isLike: false, artists: [], album: { id: 0, name: '', picUrl: '' }, isVip: false }
}

const useMusicStore = defineStore('music', {
    state() {
        return data
    },
    actions: {
        /**
         * 设置正在播放的歌曲
         * @param data 
         */
        setPlayingSong(data: any) {
            // 播放音乐消息的图标
            const icon = () => h(NIcon, null, { default: () => h(IosMusicalNote) })
            this.playingSong.album = data.album;
            this.playingSong.artists = data.artists;
            this.playingSong.id = data.id;
            this.playingSong.name = data.name;
            this.playingSong.isVip = data.isVip
            this.playingSong.isPlaying = true
            this.playingSong.isVip ? message("您正在播放vip歌曲~😎", "info", () => { }, icon) : message('正在播放 ' + data.name, "info", () => { }, icon)
        }
    }
})

export default useMusicStore


export const useMusicStoreWithout = () => {
    return useMusicStore(store)
}