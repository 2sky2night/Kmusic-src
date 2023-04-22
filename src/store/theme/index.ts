import { defineStore } from "pinia";
import type { ThemeStoreState } from "./interfaces";
import { darkTheme } from "naive-ui";
import pinia from "@/store";
import { setLocal } from "@/utils/localStorage";

// 仓库数据源
const data: ThemeStoreState = {
    /**
     * 主题颜色,null为亮色
     */
    theme: null
}

// 初始化加载本地主题数据
const localTheme = localStorage.getItem('theme')
if (localTheme) {
    // 若本地有数据,从本地加载数据,并设置html的class值为dark
    data.theme = JSON.parse(localTheme)
    if (data.theme !== null) {
        // 若不为亮色模式就改为暗色模式
        document.documentElement.classList.add("dark")
    }

} else {
    // 没有就设置本地数据
    setLocal('theme', null)
}

const useThemeStore = defineStore("theme", {
    state() {
        return data
    },
    actions: {
        /**
         * 设置主题颜色
         * @param value - 主题颜色的值 
         */
        setTheme(value: typeof this.theme) {
            // 设置组件库的主题
            this.theme = value
            // 设置html的class值
            if (value && value.name) {
                document.documentElement.classList.add("dark")
            } else {
                document.documentElement.classList.remove("dark")
            }
            setLocal('theme', this.theme)
        },
        /**
         * 切换主题颜色
         */
        toggleTheme() {
            this.theme === null ? this.setTheme(darkTheme) : this.setTheme(null)
        }
    },
    getters: {
        themeFormat({ theme }) {
            return theme ? '深色模式' : '亮色模式'
        }
    }
})

export default useThemeStore

/**
 * 在外部使用仓库钩子
 * @returns 
 */
export const useThemeStoreWithout = () => {
    return useThemeStore(pinia)
}