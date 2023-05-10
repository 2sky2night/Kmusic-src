import useThemeStore from '@/store/theme';
import { storeToRefs } from 'pinia';
import { darkTheme } from 'naive-ui';
export default function useTheme() {
    const themeStore = useThemeStore()
    const { theme, themeFormat } = storeToRefs(themeStore)

    /**
     * 设置主题颜色
     * @param flag - 真为深色,假为亮色
     */
    function toSetTheme(flag: boolean) {
        flag ? themeStore.setTheme(darkTheme) : themeStore.setTheme(null)
    }

    return {
        themeFormat,
        toSetTheme, theme
    }
}
