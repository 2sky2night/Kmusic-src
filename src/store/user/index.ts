import { defineStore } from 'pinia'
import store from '@/store'
import UserStoreState from './interfaces'

const data: UserStoreState = {
    isLogin: false,
    cookie: null
}

// 若本地有cookie值,就从本地加载数据
const cookie = localStorage.getItem('cookie')
// 若有cookie就设置为登录状态
if (cookie) {
    data.cookie = cookie
    data.isLogin = true
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
        }
    }
})

export default useUserStore

export const useUserStoreWithout = () => {
    return useUserStore(store)
}
