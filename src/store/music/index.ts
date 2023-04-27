import { defineStore } from "pinia";
import store from '@/store'
import { PlayingSongData } from "./interfaces";

const data: { playingSong: PlayingSongData } = {
    playingSong: { id: null, isPlaying: false, name: '', src: '',isLike:false,artists:[],album:{id:0,name:'',picUrl:''} }
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
        setPlayingSong(data:any) {
            this.playingSong.album = data.album;
            this.playingSong.artists = data.artists;
            this.playingSong.id = data.id;
            this.playingSong.name = data.name;
        }
    }
})

export default useMusicStore


export const useMusicStoreWithout = () => {
    return useMusicStore(store)
}