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
import { getSongKeyFrameLyric } from '@/api/public/song';

let data: StoreData = {
    playingSong: { id: null, isPlaying: false, name: '', src: '', isLike: false, artists: [], album: { id: 0, name: '', picUrl: '' }, isVip: false, songLyric: null, duration: 0, currentTime: 0, volume: 1, playType: 0 },
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
            this.playingSong = { id: null, isPlaying: false, name: '', src: '', isLike: false, artists: [], album: { id: 0, name: '', picUrl: '' }, isVip: false, songLyric: null, currentTime: 0, duration: 0, volume: 1, playType: 0 }
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
         * 添加播放列表到下一首播放
         * @param song - 下一首歌曲的信息
         */
        addSongToList(song: Song) {
            if (!this.playingSong.id) {
                return message("播放列表没有任何歌曲呢,先播放一首歌曲吧~ 🤗", "info")
            }
            if (song.id === this.playingSong.id) {
                // 若要添加的歌曲就是当前播放的歌曲禁止操作
                return message("这首歌不是在播放吗? 试试循环播放~🤔", "info")
            }

            // 检查当前音乐是否已经存在
            const index = this.songList.findIndex(ele => ele.id === song.id)
            if (index !== -1) {
                // 若存在则删除那首歌曲
                this.songList.splice(index, 1)
            }
            // 将歌曲添加到对应位置
            this.songList.some((ele, index, arr) => {
                if (ele.id === this.playingSong.id) {
                    arr.splice(index + 1, 0, song)
                    return
                }
            })
            message("添加成功 😎", "success")
        },
        /**
         * 顺序播放上一首歌曲
         */
        preSong() {
            // 获取到当前播放的歌曲
            let index = this.songList.findIndex(ele => ele.id === this.playingSong.id);
            if (index <= 0) {
                // 若当前为第一首歌曲或未找到,则播放倒数第一首歌曲
                index = this.songList.length - 1
            } else {
                index--
            }
            // 确定当前要播放的歌曲
            const song = this.songList[index];
            this.playSong(song)
        },
        /**
         * 顺序播放下一首歌曲
         */
        nextSong() {
            // 获取到当前播放的歌曲
            let index = this.songList.findIndex(ele => ele.id === this.playingSong.id);

            if (index >= 0 && index < this.songList.length - 1) {
                index++;
            } else {
                // 若当前未找到或为最后一首歌曲就播放第一首歌曲
                index = 0;
            }

            // 确定当前要播放的歌曲
            const song = this.songList[index];
            this.playSong(song)
        },
        /**
         * 更新播放歌曲的方式
         */
        changeType() {
            switch (this.playingSong.playType) {
                case 0: this.playingSong.playType++; message("单曲循环 😙", "info"); break;
                case 1: this.playingSong.playType++; message("随机播放 😨", "info"); break;
                case 2: this.playingSong.playType = 0; message("列表播放 😀", "info"); break;
            }
        },
        /**
         * 随机播放歌曲
         */
        randomPlay() {
            // 获取当前播放的歌曲索引
            const currentIndex = this.songList.findIndex(ele => ele.id === this.playingSong.id);
            // 生成随机数
            for (; ;) {
                const index = Math.floor(Math.random() * this.songList.length);
                console.log(index);
                if (index !== currentIndex) {
                    this.playSong(this.songList[index])
                    break;
                }
            }
        },
        /**
         * 播放歌曲
         * @param song 
         */
        playSong(song: Song) {
            this.setPlayingSong({
                id: song.id,
                name: song.name,
                album: { name: song.al.name, id: song.al.id, picUrl: song.al.picUrl },
                artists: song.ar,
                isVip: song.privilege.freeTrialPrivilege.resConsumable
            })
        }
    }
})

export default useMusicStore


export const useMusicStoreWithout = () => {
    return useMusicStore(store)
}