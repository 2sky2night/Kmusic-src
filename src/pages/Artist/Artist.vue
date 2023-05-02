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
                </div>
                <!--歌手的简介-->
                <span style="word-break: break-all;">
                    {{ artistData?.artist.briefDesc }}
                </span>
            </div>
        </div>

        <n-tabs type="segment" animated>
            <n-tab-pane name="chap1" tab="热门单曲">
                <Songs />
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
// 接口
import type { ArtistData } from '@/api/Artist/interfaces';
// api
import { getArtistInfor } from '@/api/Artist';
// 钩子
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue';
// 工具函数
import message from '@/utils/message';
//  图标
import { MusicalNotes, Albums as AlbumsIcon, Videocam } from '@vicons/ionicons5'

const $route = useRoute()
// 歌手详情信息
const artistData = ref<ArtistData>()
// 正在加载
const isLoading = ref(true)

onMounted(async () => {
    const id = +$route.params.id
    try {
        const res = await getArtistInfor(id)
        if (res.code !== 200) await Promise.reject()
        artistData.value = res.data
        isLoading.value=false
    } catch (error) {
        message("获取歌手详情信息失败 😪", "error")
    }
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
        .artist-data>span:last-child{
            font-size: 12px;
        }
    }
}
</style>
