import { App } from "vue";
import pinia from "./store";
import router from "./router";
// 全局样式
import './style.css'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 全局组件
import Button from "./components/Button/Button.vue";
import SkeletonList from '@/components/SkeletonList/SkeletonList.vue';
import PlayListCard from "./components/PlayListCard/PlayListCard.vue";
import AlbumCard from '@/components/AlbumCard/AlbumCard.vue';
import MvCard from '@/components/MvCard/MvCard.vue'
import ArtistCard from '@/components/ArtistCard/ArtistCard.vue'
import EmptyPage from '@/components/EmptyPage/EmptyPage.vue'
export default {
    install(app: App) {
        // 安装pinia仓库
        app.use(pinia)
        // 安装路由
        app.use(router)
        // 安装全局组件
        app.component('Button', Button)
        app.component('SkeletonList', SkeletonList)
        app.component('PlayListCard', PlayListCard)
        app.component('AlbumCard', AlbumCard)
        app.component('MvCard', MvCard)
        app.component('ArtistCard', ArtistCard)
        app.component('EmptyPage', EmptyPage)
    }
}