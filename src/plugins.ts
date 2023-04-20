import { App } from "vue";
import pinia from "./store";
import router from "./router";
// 全局样式
import './style.css'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

export default {
    install(app: App) {
        // 安装pinia仓库
        app.use(pinia)
        // 安装路由
        app.use(router)
    }
}