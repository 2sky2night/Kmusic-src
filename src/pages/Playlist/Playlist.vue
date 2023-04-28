<template>
    <div class="page page-layout" v-if="!firstLoading">
        <div class="music-infor">
            <div class="cover">
                <Cover :img="playlistInfor?.coverImgUrl" />
            </div>
            <div class="infor">
                <n-h1> {{ playlistInfor?.name }}</n-h1>

                <n-h2>歌单简介</n-h2>
                <div class="desc">
                    <n-ellipsis :line-clamp="4" :tooltip="false" ref="textClip">
                        {{ playlistInfor?.description || '无' }}
                    </n-ellipsis>
                    <span style="visibility: hidden;position: absolute;" ref="text">
                        {{ playlistInfor?.description || '无' }}
                    </span>
                    <n-button v-if="checkDescShow">全部简介</n-button>
                </div>

                <div class="tags" v-once>
                    <Tag v-for="item in playlistInfor?.tags" :key="item" :title="item" :round="true" size="medium" />
                </div>
                <div class="list-data" v-once>
                    <div>
                        <span>评论数量 </span>
                        <span> {{ countFormat((playlistDynamic as PlaylistDynamicRes).commentCount) }}</span>
                    </div>
                    <div>
                        <span>播放数量 </span>
                        <span>{{ countFormat((playlistDynamic as PlaylistDynamicRes).playCount) }}</span>
                    </div>
                    <div>
                        <span>歌单分享 </span>
                        <span>{{ countFormat((playlistDynamic as PlaylistDynamicRes).shareCount) }}</span>
                    </div>
                </div>
                <n-button strong secondary v-if="userStore.userData.id!==playlistInfor?.creator.userId" @click.stop="toSubscribe" size="small" :type="isSub ? 'primary' : 'default'">
                    {{ isSub ? '已收藏' : '收藏' }}
                </n-button>
            </div>
        </div>
        <div class="list">
            <div class="list-title">
                <n-h1> {{ playlistInfor?.name }}</n-h1>
                <div class="user">
                    <UserCard :width="30" :height="30" :id="playlistInfor?.creator.userId"
                        :name="playlistInfor?.creator.nickname" :img="playlistInfor?.creator.avatarUrl" />
                    <span class="text" style="margin-left: 5px;">{{ playlistInfor?.creator.nickname }}</span>
                </div>
                <div class="list-time">
                    <div>
                        创建时间 <span v-text="timeFormat((playlistInfor as PlaylistInfor).createTime)"></span>
                    </div>
                    <div>
                        更新时间 <span v-text="timeFormat((playlistInfor as PlaylistInfor).updateTime)"></span>
                    </div>
                </div>
            </div>
            <ul>
                <SongItem v-for="item in songs" :key="item.id" :song="item" />
            </ul>
            <div class="pagination">
                <n-pagination :page-slot="7" v-model:page="page" :page-count="pages" />
            </div>

        </div>
    </div>
</template>
<script lang='ts' setup>
// 组件
import Tag from '@/components/Tag/Tag.vue';
// 接口
import { Song } from '@/api/public/indexfaces';
import type { PlaylistInfor, PlaylistDynamicRes } from '@/api/Playlist/interfaces';
// api
import { getPlaylistInfor, getPlaylistDynamic, getPlaylistSong, toggleSubPlaylist } from '@/api/Playlist';
// 钩子
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import { onMounted, ref, reactive, watch, nextTick } from 'vue';
import useUserStore from '@/store/user';
// 工具函数
import { checkPage } from '@/utils/tools'
import { timeFormat, countFormat, countPage } from '@/utils/computed'
import message from '@/utils/message';
// 用户仓库
const userStore = useUserStore()
// 歌曲简介真实容器
const text = ref<HTMLElement | null>(null)
// 歌曲简介裁剪成4行的容器
const textClip = ref<any | null>(null)
// 是否需要显示查看简介的按钮
const checkDescShow = ref(false)
// 歌曲的详情信息
const playlistInfor = ref<PlaylistInfor | null>(null)
// 歌曲的动态信息
const playlistDynamic = ref<PlaylistDynamicRes | null>(null)
// 歌曲列表
const songs = reactive<Song[]>([])
// 正在加载
const isLoading = ref(false)
// 初次加载
const firstLoading = ref(true)
// 当前是第x页
const page = ref(0)
// 一共多少页
let pages = 0
// 是否离开当前页了
const isLeave = ref(false)
// 是否关注
const isSub = ref(false)
// 路由
const $router = useRouter()
const $route = useRoute()

// 初始化时,加载歌单基本数据
onMounted(async () => {
    isLoading.value = true
    try {
        // 加载歌单详情数据
        const resInfor = await getPlaylistInfor(+$route.params.id)
        resInfor.code !== 200 ? Promise.reject() : '';
        playlistInfor.value = resInfor.playlist;
        pages = countPage(20, playlistInfor.value.trackCount)
        // 加载歌单动态数据
        const resDynamic = await getPlaylistDynamic(+$route.params.id)
        resDynamic.code !== 200 ? Promise.reject() : ''
        playlistDynamic.value = resDynamic
        isSub.value = playlistDynamic.value.subscribed
        isLoading.value = false
        firstLoading.value = false
        nextTick(() => {
            // 判断当前简介和裁剪后的简介高度是否一样,一样就不显示查看更多按钮
            if ((text.value as HTMLElement).clientHeight > textClip.value.$el.clientHeight) {
                checkDescShow.value = true
                console.log('裁剪后的简介和未裁剪的高度不一致,需要显示查看全部简介的按钮');
            }
        })


    } catch (error) {
        message("加载歌单失败 😰", "error")
    }
})


/**
 * 获取某一页的歌曲
 */
async function getSong() {
    isLoading.value = true
    // 删除当前页歌单的歌曲
    songs.splice(0, songs.length)
    try {
        const res = await getPlaylistSong(+$route.params.id, page.value)
        res.code !== 200 ? Promise.reject() : ''
        res.songs.forEach((ele, index) => {
            songs.push({ ...ele, privilege: { ...res.privileges[index] } })
        })
        isLoading.value = false
    } catch (error) {
        message("加载歌单的歌曲失败 😓", "error")
    }
}

/**
 * 收藏或取消收藏歌单
 */
async function toSubscribe() {
    if (!userStore.isLogin && !userStore.cookie) {
        message("请登录后再使用此功能 😋", "warning")
        return
    }
    let type: 0 | 1 = 0
    // 当前是收藏就设置为不收藏,为不收藏,就设置为收藏
    isSub.value ? type = 0 : type = 1
    const res = await toggleSubPlaylist(type, (playlistInfor.value as PlaylistInfor).id)
    if (res.code === 200) {
        message(type ? "收藏歌单成功" : "取消收藏歌单成功", "success")
        isSub.value = type ? true : false
    } else {
        message("收藏/取消收藏歌单失败 😅", "error")
    }
}

// 监听页数的变化,发送请求获取数据
watch(page, (v, o) => {
    if (v === o) {
        return
    }
    $router.push({
        path: $route.path,
        query: {
            page: v
        }
    })
})

// 路由变化就发送请求获取数据
watch(() => $route.fullPath, () => {
    console.log('路由变化了');
    // 若当前离开当前页了,就不执行获取数据了
    if (isLeave.value) {
        return
    }
    // 更新页码,获取歌单当前页的歌曲
    page.value = checkPage($route.query.page as any);
    getSong()
}, { immediate: true })

onBeforeRouteLeave(() => {
    console.log('离开路由了');
    isLeave.value = true
})



</script>
<style scoped>
.page {
    padding: 20px 0;
}
</style>