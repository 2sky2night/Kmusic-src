<template>
    <div class="page">
        <div class="title">
            <span>{{ songs.length ? name : '未知歌手' }}</span>
            <span>全部歌曲</span>
        </div>
        <div class="list">
            <ul v-if="!isLoading">
                <SongItem v-for="item in songs" :song="item" :key="item.id" />
                <div class="pagination" v-if="pages > 1">
                    <n-pagination v-model:page="page" :page-count="pages">
                        <template #prefix>
                          共 {{ count }} 项
                        </template>
                    </n-pagination>
                </div>
            </ul>
            <SongItemSkeletonList v-else :length="20" />
        </div>
    </div>
</template>
<script lang='ts' setup>
// api
import { getArtistSongs, getSongs } from '@/api/ArtistSongs';
import { getArtistInfor } from '@/api/Artist';
// 钩子
import { reactive, ref, onMounted, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
// 接口
import type { Song } from '@/api/public/indexfaces';
// 组件
import SongItem from '@/components/SongItem/SongItem.vue';
import SongItemSkeletonList from '@/components/SkeletonList/SongItemSkeletonList/SongItemSkeletonList.vue';
// 工具函数
import message from '@/utils/message';
import { countPage } from '@/utils/computed';
import { checkPage } from '@/utils/tools';

// 路由实例对象
const $router = useRouter()
// 路由元数据
const $route = useRoute()
// 排序方式
const order = ref<'hot' | 'time'>('hot')
// 歌曲
const songs = reactive<Song[]>([])
// 正在加载
const isLoading = ref(true)
// 当前多少页 (根据当前路由查询参数加载对应多少页)
const page = ref($route.query.page ? checkPage(+$route.query.page) : 1)
// 总共多少条
const count = ref(0)
// 总共多少页
let pages = 0
// 歌手名称
const name = ref('')
/**
 * 获取歌手对应页数的歌曲
 * @param id - 歌手id
 */
async function getSongsData(id: number) {
    isLoading.value = true
    // 清空当前歌曲
    songs.splice(0, songs.length)
    try {
        const res = await getArtistSongs(id, page.value, order.value)
        if (res.code !== 200) await Promise.reject()
        res.songs.forEach(ele => {
            songs.push(ele)
        })
        // 获取歌曲列表的封面
        const resSongs = await getSongs(songs.map(ele => ele.id))
        if (resSongs.code !== 200) await Promise.reject()
        // 将歌曲封面保存给歌曲列表
        resSongs.songs.forEach((ele, index) => {
            songs[index].al.picUrl = ele.al.picUrl
        })
        isLoading.value = false
    } catch (error) {
        message("获取歌手的歌曲失败 🤐", "error")
    }
}

onMounted(async () => {
    const id = +$route.params.id
    try {
        const resName = await getArtistInfor(id)
        if (resName.code !== 200) await Promise.reject()
        name.value = resName.data.artist.name
        const res = await getArtistSongs(id, page.value, order.value)
        if (res.code !== 200) await Promise.reject()
        // 获取歌曲列表
        res.songs.forEach(ele => {
            songs.push(ele)
        })
        // 获取条数
        count.value = res.total
        pages = countPage(20, count.value)
        // 获取歌曲列表的封面
        const resSongs = await getSongs(songs.map(ele => ele.id))
        if (resSongs.code !== 200) await Promise.reject()
        // 将歌曲封面保存给歌曲列表
        resSongs.songs.forEach((ele, index) => {
            songs[index].al.picUrl = ele.al.picUrl
        })

        isLoading.value = false
    } catch (error) {
        message("获取歌手的歌曲失败 🤐", "error")
    }
})

watch(page, (v) => {
    $router.push({
        path: $route.path,
        query: {
            page: v
        }
    })
    getSongsData(+$route.params.id)
})

onBeforeRouteUpdate((to) => {
    page.value = +(to.query as any).page
})

</script>
<style scoped lang="scss">
.page {
    box-sizing: border-box;
    padding: 10px;
}

.title {
    span:first-child {
        font-size: 30px;
        font-weight: bolder;
        margin-right: 10px;
    }
}

.list ul {
    display: flex;
    flex-direction: column;
}
</style>