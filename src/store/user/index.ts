import { defineStore } from 'pinia'
import store from '@/store'
import UserStoreState from './interfaces'
import { setLocal, getLocal } from '@/utils/localStorage'

const data: UserStoreState = {
    isLogin: false,
    cookie: null,
    userData: {
        id: null,
        nickname: null,
        avatar: 'https://p4.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg',
        level: 0
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
    
    if (userData!== null) {
        // 本地有数据
        data.userData.avatar = userData.avatar
        data.userData.level = userData.level
        data.userData.id = userData.id
        data.userData.nickname = userData.nickname
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
            setLocal('userData', this.userData)
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
