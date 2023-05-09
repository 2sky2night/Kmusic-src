// 钩子
import { defineStore } from "pinia";
import store from '@/store'
// 接口
import type { StoreData } from "./interfaces";
import type { Song } from "@/api/public/indexfaces";
// 工具函数
import message from "@/utils/message";
import { getLocal, setLocal } from "@/utils/localStorage";
// 图标
import { h } from "vue";
import { NIcon } from "naive-ui";
import { IosMusicalNote } from '@vicons/ionicons4'
// api
import { getSongKeyFrameLyric, getSongLyric } from '@/api/public/song';

let data: StoreData = {
    playingSong: { id: null, isPlaying: false, name: '', src: '', isLike: false, artists: [], album: { id: 0, name: '', picUrl: '' }, isVip: false, songLyric: null, duration: 0, currentTime: 0, volume: 1 },
    history: [],
    songList: []
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
            this.playingSong = { id: null, isPlaying: false, name: '', src: '', isLike: false, artists: [], album: { id: 0, name: '', picUrl: '' }, isVip: false, songLyric: null, currentTime: 0, duration: 0, volume: 1 }
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
        },
        /**
         * 获取歌曲的歌词
         */
        async getSongLyric() {
            try {
                const res = await getSongKeyFrameLyric(this.playingSong.id as number);
                if (res.code !== 200) await Promise.reject()
                this.playingSong.songLyric = {
                    romalrc: res.romalrc,
                    qfy: res.qfy,
                    klyric: res.klyric,
                    lrc: res.lrc,
                    sfy: res.sfy,
                    sgc: res.sgc,
                    tlyric: res.tlyric,
                    yrc: res.yrc,
                    ytlrc: res.ytlrc
                }
            } catch (error) {
                message("获取歌词失败 🤔", "warning")
            }
        },
        /**
         * 清空播放列表
         */
        clearSongList() {
            this.songList.length = 0;
        },
        /**
         * 更新播放列表
         * @param list - 音乐列表
         */
        updateSongList(list: Song[]) {
            this.songList = list;
        },
        /**
         * 下一首播放
         * @param song - 下一首歌曲的信息
         */
        addSongToList(song: Song) {
            // 检查当前音乐是否已经存在
            const index = this.songList.findIndex(ele => ele.id === song.id)
            if (index !== -1) {
                // 若存在则删除那首歌曲
                this.songList.splice(index,1)
            }
            // 将歌曲添加到对应位置
            this.songList.some((ele,index,arr) => {
                if (ele.id === this.playingSong.id) {
                    arr.splice(index+1, 0, song)
                    return
                }
            })
            message("添加成功 😎","success")
        }
    }
})

export default useMusicStore


export const useMusicStoreWithout = () => {
    return useMusicStore(store)
}