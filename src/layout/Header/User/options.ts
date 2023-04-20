import { h, Component } from 'vue'
import { NIcon, NAvatar } from 'naive-ui'
import { useThemeStoreWithout } from '@/store/theme'
import './user.css'
import {
    PersonCircleOutline as UserIcon,
    LogOutOutline as LogoutIcon,
    ApertureOutline as ApertureIcon
} from '@vicons/ionicons5'
import { IosPaper as IosPaperIcon, MdHappy as MdHappyIcon } from '@vicons/ionicons4'
// 获取主题仓库
const useThemeStore = useThemeStoreWithout()

// 渲染图标虚拟DOM
const renderIcon = (icon: Component) => {
    return () => h(NIcon, null, { default: () => h(icon) })
}

/**
 * 创建头部渲染信息(渲染用户信息需要从仓库中获取)
 * @returns 虚拟DOM
 */
function renderCustomHeader() {
    return h(
        'div',
        { style: 'display:flex;padding:0 10px;height:50px;align-items: center;user-select: none;;', class: 'drop-down-header' },
        [
            h(NAvatar, { src: "https://p4.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg" }),
            h('div', { style: 'margin-left:5px;' }, [
                h('h5', '未登录'),
                h('div', { style: 'font-size:12px;' }, '登录尽享更多权益')
            ])
        ]
    )
}

// 创建切换主题的虚拟DOM
function renderTheme() {
    return h('div', {
        class: 'drop-down-box',
        onClick: () => useThemeStore.toggleTheme()
    }, [
        h('div', [
            h(NIcon, { size: 15 }, { default: () => h(ApertureIcon) }),
            h('span', useThemeStore.themeFormat)
        ]),
    ]
    )
}

// 渲染的配置项(需要根据当前登录状态动态的渲染数据)
const options = [
    {
        key: 'header',
        type: 'render',
        render: renderCustomHeader
    },
    {
        key: 'header',
        type: 'render',
        render: renderTheme
    },
    {
        label: '每日歌曲推荐',
        key: 'remmon',
        icon: renderIcon(MdHappyIcon)
    },
    {
        label: '播放的历史记录',
        key: 'history',
        icon: renderIcon(IosPaperIcon)
    },
    {
        label: '登录',
        key: 'login',
        icon: renderIcon(UserIcon)
    },
    {
        label: '退出登录',
        key: 'logout',
        icon: renderIcon(LogoutIcon)
    }
]

export default options