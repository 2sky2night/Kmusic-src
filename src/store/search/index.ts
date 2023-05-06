import { defineStore } from "pinia";
import store from '../'
import type { SearchData } from './interfaces'
import { getLocal, setLocal } from "@/utils/localStorage";


// 数据源
const data: SearchData = {
    history: [],
    keywords: ''
}

// 初始化加载时获取本地数据,若本地有数据则
// 仓库初始化为本地数据,若没有设置本地数据为初始值
const localData = getLocal('search-history')

if (localData) {
    data.history = localData;
} else {
    setLocal('search-history', data.history)
}


const useSearchStore = defineStore('search', {
    state: () => data,
    actions: {
        /**
         * 增加历史记录
         * @param name - 历史记录的名称
         * @param time - 历史记录的添加时间
         */
        addHistory(name: string, time: number) {
            // 检查当前添加历史记录是否存在
            const index = this.history.findIndex(ele => ele.name === name)
            if (index !== -1) {
                // 存在删除,该记录
                this.history.splice(index, 1)
            }
            this.history.unshift({ name, time })
        },
        /**
         * 删除历史记录
         */
        deleteHistory(time: number) {
            this.history.some((ele, index, arr) => {
                if (ele.time === time) {
                    arr.splice(index, 1)
                    return
                }
            })
        }
    }
})

export default useSearchStore
export const useSearchStoreWithout = () => {
    return useSearchStore(store)
}