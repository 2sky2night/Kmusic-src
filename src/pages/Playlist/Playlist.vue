<template>
    <div class="page page-layout">
        <div class="music-infor" v-if="!firstLoading">
            <div class="cover">
                <Cover :img="playlistInfor?.coverImgUrl" />
            </div>
            <div class="infor">
                <n-h1> {{ playlistInfor?.name }}</n-h1>

                <n-h2>歌单简介</n-h2>
                <div class="desc" @click="showDes" style="cursor: pointer;">
                    <n-ellipsis style="width:250px;" :line-clamp="4" :tooltip="false">
                        {{ playlistInfor?.description || '无' }}
                    </n-ellipsis>
                </div>

                <div class="tags" v-once>
                    <Tag @click="() => toDiscover(item)" style="margin-right: 5px;cursor: pointer;"
                        v-for="item in playlistInfor?.tags" :key="item" :title="item" :round="true" size="small" />
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

                <div class="playlist-subscribers" v-if="playlistInfor?.subscribers.length">
                    <span>最近收藏该歌单的用户</span>
                    <ul>
                        <li v-for="item in playlistInfor?.subscribers" :key="item.userId">
                            <UserCard :img="item.avatarUrl" :id="item.userId" :name="item.nickname" :height="30"
                                :width="30" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="list" v-if="!firstLoading">
            <div class="list-title">
                <n-h1> {{ playlistInfor?.name }}</n-h1>
                <div class="user">
                    <UserCard :width="30" :height="30" :id="playlistInfor?.creator.userId"
                        :name="playlistInfor?.creator.nickname" :img="playlistInfor?.creator.avatarUrl" />
                    <span @click="goToUser" class="text" style="margin-left: 5px;">{{ playlistInfor?.creator.nickname
                    }}</span>
                </div>
                <div class="list-time">
                    <div v-once>
                        创建时间 <span v-text="timeFormat((playlistInfor as PlaylistInfor).createTime)"></span>
                    </div>
                    <div v-once>
                        更新时间 <span v-text="timeFormat((playlistInfor as PlaylistInfor).updateTime)"></span>
                    </div>
                    <n-button strong secondary v-if="userStore.userData.id !== playlistInfor?.creator.userId"
                        @click.stop="toSubscribe" size="small" :type="isSub ? 'warning' : 'default'">
                        {{ isSub ? '已收藏' : '收藏' }}
                    </n-button>
                    <n-button strong secondary size="small" class="check-desc" v-if="playlistInfor?.description"
                        @click="showDes" style="margin-left: 5px;">查看简介</n-button>
                    <n-button @click="goToPlaylistCmt" size="small" strong secondary type="info"
                        style="margin-left: 5px;">评论 {{ countFormat(playlistDynamic?.commentCount as number) }}</n-button>
                </div>
            </div>
            <ul v-if="!isLoading && songs.length">
                <SongItem v-for="item in songs" :key="item.id" :song="item" />
            </ul>
            <EmptyPage description="当前页没有任何一首歌曲 😉" :show-btn="true" v-if="songs.length === 0 && !isLoading" />
            <SongItemSkeletonList :length="20" v-if="isLoading" />
            <div class="pagination" v-if="pages > 1 && songs.length">
                <span style="margin-right: 10px;">总共 {{ (playlistInfor as PlaylistInfor).trackIds.length }} 项</span>
                <n-pagination :page-slot="7" v-model:page="page" :page-count="pages" />
            </div>
        </div>
        <PlaylistSkeleton v-if="firstLoading" />
    </div>
</template>
<script lang='ts' setup>
// 组件
import PlaylistSkeleton from '@/components/PageSkeleton/PlaylistSkeleton/PlaylistSkeleton.vue';
import Tag from '@/components/Tag/Tag.vue';
// 接口
import { Song } from '@/api/public/indexfaces';
import type { PlaylistInfor, PlaylistDynamicRes } from '@/api/Playlist/interfaces';
// api
import { getPlaylistInfor, getPlaylistDynamic, getPlaylistSong, toggleSubPlaylist } from '@/api/Playlist';
// 钩子
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { onMounted, ref, reactive, watch } from 'vue';
import useUserStore from '@/store/user';
// 工具函数
import { checkPage } from '@/utils/tools'
import { timeFormat, countFormat, countPage } from '@/utils/computed'
import message from '@/utils/message';
import { messageboxWithout } from '@/render/MessageBox';

// 用户仓库
const userStore = useUserStore()
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
// 是否关注
const isSub = ref(false)
// 路由
const $router = useRouter()
const $route = useRoute()

// 初始化时,加载歌单基本数据
onMounted(() => {
    getData(+$route.params.id)
})

/**
 * 获取歌单信息
 * @param id - 歌单的id
 */
async function getData(id: number) {

    // 获取当前访问的第几页歌单
    page.value = checkPage($route.query.page as any);
    isLoading.value = true
    try {
        // 加载歌单详情数据
        const resInfor = await getPlaylistInfor(id)
        resInfor.code !== 200 ? await Promise.reject() : '';
        if (!resInfor.playlist.creator) await Promise.reject()
        playlistInfor.value = resInfor.playlist;
        pages = countPage(20, playlistInfor.value.trackIds.length)
        // 加载歌单动态数据
        const resDynamic = await getPlaylistDynamic(id)
        resDynamic.code !== 200 ? await Promise.reject() : ''
        playlistDynamic.value = resDynamic
        isSub.value = playlistDynamic.value.subscribed
        isLoading.value = false
        firstLoading.value = false
        getSong(id)
    } catch (error) {
        message("加载歌单失败 😰", "error")
        $router.replace('/404')
    }

}

/**
 * 获取某一页的歌曲
* @param id - 歌单的id
 */
async function getSong(id: number) {
    isLoading.value = true;
    // 删除当前页歌单的歌曲
    songs.length = 0;
    try {
        const res = await getPlaylistSong(id, page.value);
        res.code !== 200 ? await Promise.reject() : '';
        // 解决路由更新莫名其妙调用两次回调的问题
        if (songs.length > 0) return
        res.songs.forEach((ele, index) => {
            songs.push({ ...ele, privilege: { ...res.privileges[index] } })
        })
        if (songs.length === 0) {
            message("这一页没有数据呢 😁", "info")
        }
        isLoading.value = false
    } catch (error) {
        message("加载歌单的歌曲失败 😓", "warning")
        $router.replace('/404')
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

/**
 * 点击标签进入发现页搜索歌单
 * @param tag 
 */
function toDiscover(tag: string) {
    $router.push(`/discover/playlist?tag=${tag}&page=1`)
}

// 监听页数的变化,发送请求获取数据
watch(page, (v) => {
    $router.push({
        path: $route.path,
        query: {
            page: v
        }
    })

})

onBeforeRouteUpdate(async (to, from) => {
    // 对比新旧动态参数,若两者不相同说明动态参数更新了
    const newId = +to.params.id;
    const oldId = +from.params.id;
    if (newId !== oldId) {
        // 若新旧动态参数不一致,重新获取最新的歌单信息
        firstLoading.value = true;
        await getData(newId);
        firstLoading.value = false;
    }
    page.value = checkPage(to.query.page as any);
    // 获取歌曲的内容新旧动态参数无所谓
    getSong(newId);
})

/**
 * 去歌单评论页
 */
function goToPlaylistCmt() {
    $router.push(`/playlist-comment/${playlistInfor.value?.id}?page=1`)
}

/**
 * 去用户页面
 */
function goToUser() {
    if (playlistInfor.value?.creator.userId === userStore.userData.id) {
        $router.push('/my')
    } else {
        $router.push(`/user/${playlistInfor.value?.creator.userId}`)
    }
}

/**
 * 查看歌曲简介
 */
function showDes() {
    (playlistInfor.value as PlaylistInfor).description && messageboxWithout((playlistInfor.value as PlaylistInfor).description, '歌单简介')
}

</script>
<style scoped lang="scss">
.page {
    padding-top: 20px
}

.playlist-subscribers {
    span {
        font-size: 13px;
        font-weight: 600;
    }

    ul {
        display: grid;
        box-sizing: border-box;
        padding: 0 10px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        row-gap: 10px;
    }

}

@media screen and (max-width:800px) {
    .playlist-subscribers {
        display: none;
    }

    .list-time {
        >div:nth-child(2) {
            display: none;
        }
    }
}
</style>