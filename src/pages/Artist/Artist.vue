<template>
    <div class="page">
        <!--歌手信息-->
        <div class="artist-infor" v-if="!isLoading">
            <div class="artist-cover">
                <img :src="artistData?.artist.avatar" />
            </div>
            <div class="artist-data">
                <h1>{{ artistData?.artist.name }}</h1>
                <!--歌手的其他身份-->
                <div>
                    <span v-for="item in artistData?.secondaryExpertIdentiy" :key="item.expertIdentiyId">
                        {{ item.expertIdentiyName }}
                    </span>
                </div>
                <!--歌手的其他信息-->
                <div class="more-data">
                    <span>
                        <n-icon color="#4098fc" size="20" style="position: relative;top:5px">
                            <MusicalNotes />
                        </n-icon>
                        {{ artistData?.artist.musicSize }} 首歌
                    </span>
                    <span>
                        <n-icon color="#4098fc" size="20" style="position: relative;top:5px">
                            <AlbumsIcon />
                        </n-icon>
                        {{ artistData?.artist.albumSize }} 张专辑
                    </span>
                    <span>
                        <n-icon color="#4098fc" size="20" style="position: relative;top:5px">
                            <Videocam />
                        </n-icon>
                        {{ artistData?.artist.mvSize }} 个MV
                    </span>
                    <n-button size="small" strong secondary @click="toSubArtist" :type="isSub ? 'warning' : 'default'">{{
                        isSub ? '已收藏' : '收藏歌手' }}</n-button>
                </div>
                <!--歌手的简介-->
                <n-ellipsis :line-clamp="3" :tooltip="false">
                    <span style="word-break: break-all;cursor: pointer;" @click="checkArtistDes">
                        {{ artistData?.artist.briefDesc }}
                    </span>
                </n-ellipsis>

            </div>
        </div>
        <ArtistSkeleton v-else />
        <!--面板信息-->
        <n-tabs type="segment" animated>
            <n-tab-pane name="chap1" tab="热门单曲">
                <Songs @sub-state="getSubState" />
            </n-tab-pane>
            <n-tab-pane name="chap2" tab="专辑">
                <Albums />
            </n-tab-pane>
            <n-tab-pane name="chap3" tab="MV">
                <MVs />
            </n-tab-pane>
        </n-tabs>

    </div>
</template>
<script lang='ts' setup>
// 组件
import MVs from './components/MVs/MVs.vue'
import Songs from './components/Songs/Songs.vue'
import Albums from './components/Albums/Albums.vue'
import ArtistSkeleton from '@/components/PageSkeleton/ArtistSkeleton/ArtistSkeleton.vue';
// 接口
import type { ArtistData } from '@/api/Artist/interfaces';
// api
import { getArtistInfor, subArtist } from '@/api/Artist';
// 钩子
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue';
import useUserStore from '@/store/user';
// 工具函数
import message from '@/utils/message';
//  图标
import { MusicalNotes, Albums as AlbumsIcon, Videocam } from '@vicons/ionicons5'
// 渲染函数
import { messageboxWithout } from '@/render/MessageBox';

const $route = useRoute()
// 歌手详情信息
const artistData = ref<ArtistData>()
// 正在加载
const isLoading = ref(true)
// 收藏该歌手没
const isSub = ref(false)
// 用户仓库
const userStore = useUserStore()

onMounted(() => {
    getArtistData(+$route.params.id)
})

/**
 * 查看歌手简介
 */
function checkArtistDes() {
    messageboxWithout((artistData.value as ArtistData).artist.briefDesc, "歌手简介")
}

/**
 * 获取歌手的收藏状态
 */
function getSubState(value: boolean) {
    isSub.value = value
}

/**
 * 获取歌手信息
 */
async function getArtistData(id: number) {
    isLoading.value = true
    try {
        const res = await getArtistInfor(id)
        if (res.code !== 200) await Promise.reject()
        artistData.value = res.data
        isLoading.value = false
    } catch (error) {
        message("获取歌手详情信息失败 😪", "error")
    }
}

/**
 * 收藏歌手 接口问题只能取消收藏歌手
 */
async function toSubArtist() {
    if (!userStore.cookie && !userStore.isLogin) {
        message("登录后再来操作吧~", "info")
        return
    }
    try {
        if (isSub.value) {
            const res = await subArtist(+$route.params.id, 0)
            if (res.code === 200) {
                message("取消收藏歌手成功 !🤗", "success")
                isSub.value = false
            } else {
                await Promise.reject()
            }
        } else {
            message("接口安全问题 暂时不能收藏歌手 😉", "info")
            return
            const res = await subArtist(+$route.params.id, 1)
            if (res.code === 200) {
                message("收藏歌手成功 !🤗", "success")
                isSub.value = true
            } else {
                await Promise.reject()
            }
        }

    } catch (error) {
        message("收藏/取消收藏歌手失败 🙄", "error")
    }
}

/**
 * 路由动态参数更新时获取最新的歌曲信息
 */
onBeforeRouteUpdate((to) => {
    getArtistData(+to.params.id)
})

</script>
<style scoped lang="scss">
.page {
    box-sizing: border-box;
    padding: 10px;
    padding-top: 20px;
}

.artist-infor {
    display: flex;
    margin-bottom: 30px;
    align-items: center;

    .artist-cover {
        margin-right: 30px;
        min-width: 250px;
        height: 250px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 10px var(--box-shadow);

        img {
            width: 100%;
            height: 100%;
        }
    }

    .artist-data {
        padding-top: 20px;
    }

    .artist-data>h1 {
        font-size: 30px;
        font-weight: 1000;
        margin: 0;
    }

    .artist-data>div:first-of-type {
        span {
            font-size: 16px;
            color: var(--text-dark);
            margin-right: 2px;
        }

        span:not(:last-child)::after {
            content: '、';
        }

    }
}

.more-data {
    margin: 10px 0;

    span {
        margin-right: 10px;
    }
}

@media screen and (max-width:600px) {
    .page {
        padding-top: 10px;
    }

    .artist-infor {
        flex-direction: column;
        margin-bottom: 0;

        .artist-data>h1 {
            font-size: 25px;
        }

        .artist-data {
            padding: 0;
        }

        .artist-data>div:first-of-type {
            span {
                font-size: 13px;
            }
        }

        .artist-cover {
            min-width: 150px;
            height: 150px;
        }
    }
}
</style>
