import type { GlobalThemeOverrides } from 'naive-ui'
import { SelectProps, ButtonProps, InputProps } from 'naive-ui'

// 配置全局的主题
const themeOverrides: GlobalThemeOverrides = {
    common: {
        primaryColor: '#409eff',
        primaryColorHover: '#79bbff',
        primaryColorPressed: '#79bbff'
    },
    Slider: {
        fillColor: '#409eff',
        fillColorHover: '#409eff',
        handleColor: '#409eff',
    }
}

// 局部重写组件的主题
type SelectThemeOverrides = NonNullable<SelectProps['themeOverrides']>
type ButtonThemeOverrides = NonNullable<ButtonProps['themeOverrides']>
type InputThemeOverrides = NonNullable<InputProps['themeOverrides']>

export const selectThemeOverrides: SelectThemeOverrides = {
    menuBoxShadow:
        '0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)',
    peers: {
        InternalSelection: {
            textColor: '#FF0000',
            heightMedium: '42px'
        }
    }
}


export const buttonThemeOverrides: ButtonThemeOverrides = {

}

export const inputThemeOverrides: InputThemeOverrides = {
    borderFocus: '#4098fc'
}



export default themeOverrides
