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
import { useUserStoreWithout } from '@/store/user'

// 获取用户仓库
const userStore = useUserStoreWithout()

// 获取主题仓库
const themeStore = useThemeStoreWithout()

// 渲染图标虚拟DOM
const renderIcon = (icon: Component) => {
    return () => h(NIcon, null, { default: () => h(icon) })
}

/**
 * 创建头部
 * @returns 虚拟DOM
 */
function renderCustomHeader() {
    const flag = userStore.cookie && userStore.isLogin

    return h(
        'div',
        { style: 'display:flex;padding:0 10px;height:50px;align-items: center;user-select: none;;', class: 'drop-down-header' },
        [
            h(NAvatar, {
                style: { cursor: "pointer" },
                title:flag?'我的':'登录',
                src: userStore.userData.avatar + '', onClick: () => {
                    flag ? (window as any).$push('/my') : (window as any).$push('/login')
                }
            }),
            h('div', { style: 'margin-left:5px;' }, [
                h('h5', flag ? userStore.userData.nickname + '' : '未登录'),
                h('div', { style: 'font-size:12px;' }, flag ? `等级: ${userStore.userData.level}` : '登录尽享更多权益')
            ])
        ]
    )
}

// 创建切换主题的虚拟DOM
function renderTheme() {
    return h('div', {
        class: 'drop-down-box',
        onClick: () => themeStore.toggleTheme()
    }, [
        h('div', [
            h(NIcon, { size: 15 }, { default: () => h(ApertureIcon) }),
            h('span', themeStore.themeFormat)
        ]),
    ]
    )
}

// 登录后的菜单栏
export const loginMenu = [
    {
        key: 'header',
        type: 'render',
        render: renderCustomHeader
    },
    {
        key: 'theme',
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
        label: '退出登录',
        key: 'logout',
        icon: renderIcon(LogoutIcon)
    }
]
// 未登录的菜单栏
export const unLoginMenu = [
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
        label: '播放的历史记录',
        key: 'history',
        icon: renderIcon(IosPaperIcon)
    },
    {
        label: '登录',
        key: 'login',
        icon: renderIcon(UserIcon)
    }
]
