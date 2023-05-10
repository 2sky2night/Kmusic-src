<template>
    <div v-if="!isLoading" class="mv-infor">
        <!--mv视频容器-->
        <div class="video-box">
            <Video @get-instance="toGetInstance" :option="option" />
        </div>
        <!--mv的介绍-->
        <div class="infor">
            <h1>{{ (mvInfor as MvData).name }}</h1>
            <ul class="artist-list">
                <ArtistItem v-for="item in  (mvInfor as MvData).artists" :key="item.id" :id="item.id" :name="item.name"
                    :url="item.img1v1Url" />
            </ul>
            <div class="mv-data">
                <div>
                    <n-icon style="position: relative;top:2px">
                        <PlayCircleOutline />
                    </n-icon>
                    <span>{{ countFormat((mvInfor as MvData).playCount) }} 次播放</span>
                </div>
                <div>
                    <n-icon style="position: relative;top:2px">
                        <ShareSocial />
                    </n-icon>
                    <span>{{ countFormat((mvInfor as MvData).shareCount) }} 次分享</span>
                </div>
                <div>
                    <n-icon style="position: relative;top:2px">
                        <MessageOutlined />
                    </n-icon>
                    <span>{{ countFormat((mvInfor as MvData).commentCount) }} 条评论</span>
                </div>
                <n-button @click="toSubMv" strong secondary :type="isSub ? 'warning' : 'default'" size="small">{{
                    isSub ? '已收藏' : '收藏' }}</n-button>
            </div>
            <div class="desc" v-if="(mvInfor as MvData).desc">
                简介: {{ (mvInfor as MvData).desc   }}
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
// api
import { getMvInfor, getMvURL, subMv } from '@/api/MV';
// 钩子
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router';
// 接口
import type { MvData, MvType } from '@/api/MV/interfaces';
// 工具函数
import message from '@/utils/message';
import { countFormat } from '@/utils/computed'
// 组件
import Video from '@/components/Video/Video.vue'
import ArtistItem from '@/components/Card/ArtistItem/ArtistItem.vue';
// 图标
import { PlayCircleOutline, ShareSocial } from '@vicons/ionicons5'
import { MessageOutlined } from '@vicons/antd'

// 路由实例对象
const $router = useRouter()
// mv的详情数据
const mvInfor = ref<MvData>()
// 是否收藏了该mv
const isSub = ref(false)
// 当前mv所有的分辨率,以及视频资源路径
const mvBr = reactive<{ br: MvType; url: string; size: number }[]>([])
// 正在加载?
const isLoading = ref(true)
// 自定义属性
const props = defineProps<{ id: number }>()
// 自定义方法
const emit = defineEmits<{
    (e: 'loadDone'): void
}>()
// 视频的配置对象
const option = reactive<{
    url: string;
    poster: string;
    title: string;
    settings: any[],
    // quality: any[]
}>({
    url: '',
    poster: '',
    title: '',
    settings: [],
    // quality: []
})
// 播放器实例
let art: any = null

/**
 * 获取mv的信息
 */
async function getMvData() {
    isLoading.value = true
    const id = props.id
    try {

        // 获取mv的详情信息
        const resMv = await getMvInfor(id)
        resMv.code !== 200 ? await Promise.reject() : ''
        // 获取mv的数据
        mvInfor.value = resMv.data
        // 获取当前mv收藏的状态
        isSub.value = resMv.subed
        // 获取mv的分辨率类别
        resMv.data.brs.forEach(ele => {
            mvBr.push({
                br: ele.br,
                url: '',
                size: ele.size
            })
        })

        // 获取mv所有分辨率的资源路径
        for (let i = 0; i < mvBr.length; i++) {
            const res = await getMvURL(id, mvBr[i].br)
            res.code !== 200 ? await Promise.reject() : '';
            mvBr[i].url = res.data.url
        }


        // 设置视频播放器的配置项
        option.poster = mvInfor.value.cover;
        option.title = mvInfor.value.name;
        // 默认视频的分辨率为最大分辨率
        option.url = mvBr[mvBr.length - 1].url

        // 播放器分辨率列表
        const mvBrList = mvBr.map((ele, index, arr) => {
            const size = Math.round(ele.size / 2 ** 20)
            return {
                default: index === arr.length - 1,
                html: `${ele.br + 'P'}`,
                url: ele.url,
                size
            }
        })
        // 调整视频分辨率的配置项
        // option.quality = mvBrList
        // 设置播放器的自定义设置项 (调整视频分辨率的配置项)
        option.settings.push({
            html: '分辨率',
            width: 150,
            tooltip: mvBrList[mvBrList.length - 1].html,
            selector: mvBrList,
            onSelect: function (item: any) {
                message(`当前播放的视频大小为 ${item.size}Mb 😀`, "info")
                art.switchQuality(item.url, item.html);
                return item.html;
            }
        })

        // 当前组件加载完成
        isLoading.value = false
        emit('loadDone')

    } catch (error) {

        message("获取mv数据失败 😴", "error")
        $router.replace('/404')
    }
}

/**
 * 收藏/取消收藏mv
 */
async function toSubMv() {
    const { id } = props
    try {
        if (isSub.value) {
            // 取消收藏
            const res = await subMv(id, 0)
            res.code === 200 ? message("取消收藏mv成功 🤩", "success") : await Promise.reject()
            isSub.value = false
        } else {
            // 收藏
            const res = await subMv(id, 1)
            res.code === 200 ? message("收藏mv成功 🤩", "success") : await Promise.reject()
            isSub.value = true
        }
    } catch (error) {
        message("收藏/取消收藏mv失败 😂", "warning")
    }
}

/**
 * 获取播放器实例
 */
function toGetInstance(instance: any) {
    // 当前组件获取播放器实例
    art = instance
}

onMounted(getMvData)

// 检测动态参数的变化,变化需要重新获取对应mv的评论
watch(() => props.id, () => {
    // 重置数据
    isLoading.value = true
    mvBr.splice(0, mvBr.length)
    getMvData()
})


</script>
<style  lang="scss">
.artist-list {
    display: flex;
    transform-origin: left;
}

.mv-infor {
    flex-grow: 1;
    margin-right: 20px;
}

.video-box {
    width: 100%;
    height: 450px;
    margin-bottom: 10px;
}
.desc{
    font-size: 12px;
    color:var(--text-dark);
}
.infor {
    display: flex;
    flex-direction: column;

    .mv-data {
        align-items: center;
        display: flex;
        margin: 5px 0;

        div {
            margin-right: 5px;
        }
    }
}

@media screen and (max-width:700px) {
    .video-box {
        height: 300px;
    }

}

@media screen and (max-width:500px) {
    .video-box {
        height: 200px;
    }
}
</style>