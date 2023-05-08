// 钩子
import { defineStore } from "pinia";
import store from '@/store'
// 接口
import type { StoreData } from "./interfaces";
import type { Song } from "@/api/public/indexfaces";
// 工具函数
import message from "@/utils/message";
import { getLocal, setLocal } from "@/utils/localStorage";
import { h } from "vue";
import { NIcon } from "naive-ui";
import { IosMusicalNote } from '@vicons/ionicons4'

let data: StoreData = {
    playingSong: { id: null, isPlaying: false, name: '', src: '', isLike: false, artists: [], album: { id: 0, name: '', picUrl: '' }, isVip: false },
    history: []
}

// 若本地有数据就初始化仓库数据为本地的
const localData = getLocal('musicData')
if (localData) {
    data = localData
} else {
    // 若本地没有数据就初始化为原始数据
    setLocal('musicData', data)
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
        },
        /**
         * 重置当前播放的歌曲
         */
        resetPlaysons() {
            this.playingSong = { id: null, isPlaying: false, name: '', src: '', isLike: false, artists: [], album: { id: 0, name: '', picUrl: '' }, isVip: false }
        },
        /**
         * 增加一条历史记录
         * @param song 
         */
        addHistory(song: Song) {
            // 需要检测当前要添加歌曲是否存在，存在则需要删除
            this.history.some((ele, index, arr) => {
                if (ele.id === song.id) {
                    arr.splice(index, 1)
                    return true
                }
            })
            this.history.unshift(song)
        },
        /**
         * 清空所有历史记录
         */
        clearHistory() {
            this.history.length = 0;
        }
    }
})

export default useMusicStore


export const useMusicStoreWithout = () => {
    return useMusicStore(store)
}