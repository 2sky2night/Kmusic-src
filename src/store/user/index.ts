// 钩子
import { defineStore } from 'pinia'
// 仓库
import store from '@/store'
import { useSearchStoreWithout } from '../search'
import { useMusicStoreWithout } from '../music'
// 接口
import UserStoreState from './interfaces'
// 工具函数
import { setLocal, getLocal } from '@/utils/localStorage'
import message from '@/utils/message'
// api
import { getLikeSongList } from '@/api/public/song'
import { getStarAlbum } from '@/api/My/Album'
import { getUserPlayList } from '@/api/public/user'
import { toCreatePlaylist, toDeletePlaylist } from '@/api/public/playlist'
import { logout } from '@/api/public/user'

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
        idAlbums: [],
        myPlaylists: []
    }
}

// 若本地有cookie值,说明当前是登陆状态就从本地加载数据
const cookie = localStorage.getItem('cookie')
// 若有cookie就设置为登录状态
if (cookie) {
    data.cookie = cookie
    data.isLogin = true
    // 若本地有用户数据,就从本地加载数据
    const userData: any = getLocal('userData')
    if (userData !== null) {
        // 本地有数据
        data.userData.avatar = userData.avatar
        data.userData.level = userData.level
        data.userData.id = userData.id
        data.userData.nickname = userData.nickname
        data.userData.ids = userData.ids
        data.userData.idAlbums = userData.idAlbums
        data.userData.myPlaylists = userData.myPlaylists
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
            // 获取用户id说明通过cookie获取用户id成功,登录成功,需要获取用户当前喜欢的歌曲列表以及用户收藏的专辑和用户自己创建的歌单
            this.userData.id = value
            this.toGetSongLikeList()
            this.toGetStarAlbum()
            this.toGetUserPlaylist()
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
                    arr.splice(index, 1)
                    return true
                }
            })
        },
        /**
         * 获取用户自己的歌单
         */
        async toGetUserPlaylist() {
            try {
                const res = await getUserPlayList(this.userData.id as number, 0, 9999)
                if (res.code !== 200) await Promise.reject()
                // 获取用户所有歌单后过滤出用户自己的歌单
                this.userData.myPlaylists = res.playlist.filter(ele => ele.creator.userId === this.userData.id as number)
            } catch (error) {
                message("获取用户的歌单失败 😱", "warning")
            }
        },
        /**
         * 更新我的歌单数据
         * @param pid - 歌单id
         * @param type - 更新类型
         * @param value - 更新的值
         */
        updatePlaylist(pid: number, type: "count" | "cover" | "name", value: string | number) {
            this.userData.myPlaylists.some(ele => {
                if (ele.id === pid) {
                    switch (type) {
                        case 'count': ele.trackCount = value as number; break;
                        case 'cover': ele.coverImgUrl = value as string; break;
                        case 'name': ele.name = value as string; break;
                    }
                    return
                }
            })
        },
        /**
         * 创建歌单
         * @param name 
         */
        async createPlaylist(name: string) {
            try {
                const res = await toCreatePlaylist(name);
                if (res.code !== 200) await Promise.reject()
                this.userData.myPlaylists.unshift(res.playlist)
                message("添加歌单成功 😍", "success")
            } catch (error) {
                message("创建歌单失败 😂", "warning")
            }
        },
        /**
         * 删除一个歌单
         * @param id - 歌单的id
         */
        async deletePlaylist(id: number) {
            try {
                const res = await toDeletePlaylist([id])
                if (res.code == 200) {
                    // 删除歌单成功 删除仓库对应的歌单
                    this.userData.myPlaylists.some((ele, index, arr) => {
                        if (ele.id === id) {
                            arr.splice(index, 1)
                            return
                        }
                    })
                    message("删除歌单成功 🤑", "success")
                } else {
                    await Promise.reject()
                }

            } catch (error) {
                message("删除歌单失败 😨", "warning")
            }
        },
        /**
         * 登出用户 清除用户数据和搜索记录和播放的历史记录
         */
        async toLogout() {
            try {
                const res = await logout()
                if (res.code !== 200) await Promise.reject()
                // 登出成功则清空cookie 登出状态和所有用户数据以及用户模块的本地存储
                this.setLogin(false);
                this.setCookie(null);
                this.userData = {
                    id: null,
                    nickname: null,
                    avatar: 'https://p4.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg',
                    level: 0,
                    ids: [],
                    idAlbums: [],
                    myPlaylists: []
                }
                const musicStore = useMusicStoreWithout()
                musicStore.clearHistory()
                musicStore.clearSongList()
                useSearchStoreWithout().clearHistory()
                // 清除本地的cookie
                localStorage.removeItem('cookie')
                message("登出账户成功 ✨", "success");
            } catch (error) {
                message("登出失败 😴", "warning")
            }
        }
    },
    getters: {
        isLoginState(state) {
            if (state.cookie && state.isLogin) {
                return true
            } else {
                return false
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
