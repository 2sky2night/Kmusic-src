import { defineStore } from 'pinia'
import store from '@/store'
import UserStoreState from './interfaces'
import { setLocal, getLocal } from '@/utils/localStorage'
import { getLikeSongList } from '@/api/public/song'
import message from '@/utils/message'
const data: UserStoreState = {
    isLogin: false,
    cookie: null,
    userData: {
        id: null,
        nickname: null,
        avatar: 'https://p4.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg',
        level: 0,
        ids: []
    }
}

// 若本地有cookie值,就从本地加载数据
const cookie = localStorage.getItem('cookie')
// 若有cookie就设置为登录状态
if (cookie) {
    data.cookie = cookie
    data.isLogin = true
    // 若本地有用户数据,就从本地加载数据
    const userData: any = getLocal('userData')
    console.log(userData);

    if (userData !== null) {
        // 本地有数据
        data.userData.avatar = userData.avatar
        data.userData.level = userData.level
        data.userData.id = userData.id
        data.userData.nickname = userData.nickname
        data.userData.ids = userData.ids
    } else {
        // 没有就初始化用户数据
        setLocal('userData', data.userData)
    }
}


const useUserStore = defineStore('user', {
    state() {
        return data
    },
    actions: {
        setLogin(value: boolean) {
            this.isLogin = value
        },
        setCookie(value: string | null) {
            this.cookie = value
        },
        setUserId(value: number) {
            this.userData.id = value
        },
        setUserData(nickname: string, avatar: string, level: number) {
            this.userData.avatar = avatar
            this.userData.nickname = nickname
            this.userData.level = level
            this.toGetSongLikeList()
            setLocal('userData', this.userData)
        },
        // 更新用户喜欢的歌曲 (注意不要放重复了)
        setSongLikeList(id: number) {
            this.userData.ids.push(id)
            setLocal('userData', this.userData)
        },
        // 移除喜欢的歌曲
        removeSongLike(id: number) {
            this.userData.ids.some((ele, index, arr) => {
                if (ele === id) {
                    arr.splice(index, 1)
                    return true
                }
            })
            setLocal('userData', this.userData)
        },
        async toGetSongLikeList() {
            const res = await getLikeSongList()
            if (res.code === 200) {
                this.userData.ids = res.ids
                setLocal('userData', this.userData)
            } else {
                message("获取用户喜欢的歌曲失败 😰", "warning")
            }
        }
    },
    // 开启数据持久化
    persist: [
        {
            paths: ["userData"],
        },
    ],
})

export default useUserStore

export const useUserStoreWithout = () => {
    return useUserStore(store)
}
