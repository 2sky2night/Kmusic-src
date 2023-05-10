<template>
    <div class="daily-songs">
        <TitleHeader title="每日推荐" style="margin-bottom: 10px;">
            <RouterLink to="/daily-song">
                <n-text class="text">
                    查看更多
                </n-text>
            </RouterLink>
        </TitleHeader>
        <n-carousel style="max-height: 250px;border-radius: 10px;overflow: hidden;" show-arrow :show-dots="false">
            <n-carousel-item v-for="item in songs" :key="item.id" :style="{ backgroundImage: `url(${item.al.picUrl})` }">
                <div class="daily-item" @click="goToDaily">
                    <div>
                        <div class="song-cover">
                            <div class="cover-mask">
                                <img :src="item.al.picUrl">
                            </div>
                            <img :src="item.al.picUrl">
                        </div>
                    </div>
                    <div class="song-infor">
                        <n-text class="song-reason">"{{ item.reason }}"</n-text>
                        <div>
                            <n-ellipsis :tooltip="false">
                                <span class="text" @click.stop="goToSong(item.id)">{{ item.name }}</span>
                                --
                                <span class="text" @click.stop="goToArtist(item.ar[0].id)">{{ item.ar[0].name }}</span>
                            </n-ellipsis>

                        </div>

                    </div>
                </div>
            </n-carousel-item>
        </n-carousel>
    </div>
</template>
<script lang='ts' setup>
// 组件
import TitleHeader from '../TitleHeader/TitleHeader.vue';
// 接口
import { Song } from '@/api/public/indexfaces';
import { ReReason } from '@/api/public/user/interfaces'
// api
import { getReSongs } from '@/api/public/user';
// 钩子
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const $router = useRouter()

/**歌曲列表*/
const songs = reactive<Song[]>([])
/**推荐原因列表 */
const reasons: ReReason[] = []

onMounted(async () => {
    const res = await getReSongs()
    if (res.code === 200) {
        // 获取推荐的原因
        res.data.recommendReasons.forEach(ele => {
            reasons.push(ele)
        })
        // 过滤出有推荐原因的精品歌曲列表
        res.data.dailySongs.filter(ele => {
            return reasons.findIndex(res => {
                return res.songId === ele.id
            }) != -1
        }).forEach(ele => {
            songs.push(ele)
        })

    }
})

// 去每日推荐页面
function goToDaily() {
    $router.push(`/daily-song`)
}

// 去歌曲详情页
function goToSong(id: number) {
    $router.push(`/song/${id}`)
}

// 去歌手页面
function goToArtist(id: number) {
    $router.push(`/artist/${id}`)
}



</script>
<style scoped lang="scss">
.song-infor {
    padding-top: 20px;
    color: rgb(230, 230, 230);
    display: flex;
    flex-direction: column;

    .text {
        font-size: 1.5vw;
    }

    .song-reason {
        font-size: 2.8vw;
        color: rgb(230, 230, 230);
    }
}

.daily-songs {
    cursor: pointer;
    margin: 10px 0;
}

.daily-item {
    background-color: rgba(0, 0, 0, 0.236);
    backdrop-filter: blur(10px);
    display: flex;
}

.song-cover {
    width: 40%;
}

.daily-item>div {
    width: 50%;
}

.daily-item>div:first-child {
    display: flex;
    justify-content: center;
    position: relative;
}

.song-cover>img {
    width: 100%;
    height: 100%;
}

.cover-mask {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 50%;
    }
}

@media screen and (max-width:470px) {
    .song-infor {
        padding-top: 5px;
    }

    :deep(.n-carousel__arrow-group) {
        transform: scale(.6) translateY(10px) translateX(30px);
    }
}

@media screen and (max-width:350px) {
    :deep(.n-carousel__arrow-group) {
        display: none;
    }
}
</style>