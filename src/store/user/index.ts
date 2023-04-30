// 钩子
import { defineStore } from 'pinia'
// 获取根仓库
import store from '@/store'
// 接口
import UserStoreState from './interfaces'
// 工具函数
import { setLocal, getLocal } from '@/utils/localStorage'
import message from '@/utils/message'
// api
import { getLikeSongList } from '@/api/public/song'
import { getStarAlbum } from '@/api/My/Album'

// 用户的初始数据
const data: UserStoreState = {
    isLogin: false,
    cookie: null,
    userData: {
        id: null,
        nickname: null,
        avatar: 'https://p4.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg',
        level: 0,
        ids: [],
        idAlbums: []
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
        data.userData.ids = userData.idAlbums
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
            // 获取cookie说明用户登录成功,需要获取用户当前喜欢的歌曲列表以及用户收藏的专辑
            this.cookie = value
            this.toGetSongLikeList()
            this.toGetStarAlbum()
        },
        setUserId(value: number) {
            this.userData.id = value
        },
        setUserData(nickname: string, avatar: string, level: number) {
            this.userData.avatar = avatar
            this.userData.nickname = nickname
            this.userData.level = level
            // 获取当前登录用户最新的喜欢的音乐列表 (在加载app组件时,检测用户登录状态从而获取最新数据)
            // this.toGetSongLikeList()
        },
        // 更新用户喜欢的歌曲 (注意不要放重复了)
        setSongLikeList(id: number) {
            this.userData.ids.push(id)
        },
        // 移除喜欢的歌曲
        removeSongLike(id: number) {
            this.userData.ids.some((ele, index, arr) => {
                if (ele === id) {
                    arr.splice(index, 1)
                    return true
                }
            })
        },
        /**
         * 获取用户喜欢的歌曲列表
         */
        async toGetSongLikeList() {
            try {
                const res = await getLikeSongList()
                if (res.code === 200) {
                    this.userData.ids = res.ids
                    setLocal('userData', this.userData)
                } else {
                   Promise.reject()
                }
            } catch (error) {
                message("获取用户喜欢的歌曲失败 😰", "warning")
            }
     
        },
        /**
         * 获取用户收藏的专辑列表
         */
        async toGetStarAlbum() {
            try {
                // 以非常暴力的方式获取所有的专辑数量,不想一个一个的发请求获取了
                const res = await getStarAlbum(1, 999999999)
                if (res.code === 200) {
                    this.userData.idAlbums = res.data.map(ele => ele.id)
                } else {
                    Promise.reject()
                }
            } catch (error) {
                message("获取用户收藏的专辑失败 🤐", "error")
            }
        },
        /**
         * 新增收藏的专辑
         * @param id 
         */
        addStarAlbum(id: number) {
           this.userData.idAlbums.push(id)
        },
        /**
         * 移除收藏的专辑
         * @param id 
         */
        removeStarAlbum(id: number) {
            this.userData.idAlbums.some((ele, index, arr) => {
                if (ele === id) {
                    arr.splice(index,1)
                    return true
                }
            })
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
