import { defineStore } from "pinia";
import type { ThemeStoreState } from "./interfaces";

const data: ThemeStoreState = {
    /**
     * 主题颜色,null为亮色
     */
    theme: null
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
        }
    },
    getters: {
        themeFormat({ theme }) {
            return theme ? '深色模式' : '亮色模式'
        }
    }
})

export default useThemeStore