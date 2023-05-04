<template>
    <div class="discover-playlist">
        <div class="tags-btn">
            <n-button @click="togglePanel" togglePanel strong secondary style="border-radius: 20px;">
                <span style="font-size: 13px;">{{ tag }}</span>
                <n-icon>
                    <IosArrowForward />
                </n-icon>
            </n-button>
            <n-modal v-model:show="showTagPanel">
                <CategoryPanel :currentTag="(tag as string)" :tags="tags" @closePanel="togglePanel"
                    @chooseCategory="toggleTag" />
            </n-modal>
        </div>
        <div class="music-list">
            <SkeletonList v-if="isLoading" :length="limit" :coverRadius="10" :textCenter="false" />
            <ul v-else>
                <PlayListCard v-for="item in list" :key="item.id" :coverImgUrl="item.coverImgUrl" :id="item.id"
                    :name="item.name" :playCount="item.playCount" />
            </ul>

            <div class="pagination">
                <n-pagination :page-slot="6" v-model:page-size="limit" v-model:page="page" :item-count="count"
                    :page-sizes="pageSizes" show-size-picker>
                    <template #prefix>
                        <span>共 {{ count }} 项</span>
                    </template>
                </n-pagination>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
// 接口
import { Playlist } from '@/api/public/indexfaces';
// api
import { getPlaylistByTag, getPlaylistCategory } from '@/api/Discover/Playlist';
// 钩子
import { reactive, ref, onMounted, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
// 图标
import { IosArrowForward } from '@vicons/ionicons4'
// 工具函数
import { checkPage } from '@/utils/tools';
import message from '@/utils/message';
import PubSub from 'pubsub-js';
// 组件
import CategoryPanel from './components/CategoryPanel/CategoryPanel.vue';
import SkeletonList from '@/components/SkeletonList/SkeletonList.vue';
import PlayListCard from '@/components/Card/PlayListCard/PlayListCard.vue';

// 路由对象
const $router = useRouter()
// 路由源数据
const $route = useRoute()
// 当前分类
const tag = ref($route.query.tag ? $route.query.tag : '全部歌单')
// 当前页数
const page = ref($route.query.page ? checkPage(+$route.query.page) : 1)
// 是否显示分类面板
const showTagPanel = ref(false)
// 所有的一级tags和二级tags
let tags: any = {}
// 一共多少条
const count = ref(0)
// 歌单列表
const list = reactive<Playlist[]>([])
// 正在加载
const isLoading = ref(true)
// 每页多少条
const limit = ref(12)
// 自定义PageSize
const pageSizes = [
    {
        label: '12 每页',
        value: 12
    },
    {
        label: '24 每页',
        value: 24
    },
    {
        label: '36 每页',
        value: 36
    },
    {
        label: '48 每页',
        value: 48
    }
]

/**
 * 获取当前所有的分类
 */
async function getTags() {
    try {
        const res = await getPlaylistCategory()
        if (res.code !== 200) await Promise.reject()

        // 创建对象,将二级分类成数组将其归纳到对应一级分类里面
        tags.categories = res.sub.reduce((categories: any, ele) => {
            // 获取当前一级分类的key
            const keys = Object.keys(categories)
            // 若当前一级分类不存在就添加一个一级分类
            if (!keys.includes('' + ele.category)) {
                Reflect.set(categories, ele.category, [])
            }
            // 将当前二级分类保存在对应一级分类里面
            categories[ele.category].push(ele)
            return categories
        }, {})

        tags.categoryName = res.categories
        tags.all = res.all

    } catch (error) {
        message("获取歌单分类失败 🤐", "error")
    }
}

/**
 * 切换显示分类面板
 */
function togglePanel() {
    showTagPanel.value = !showTagPanel.value
}

/**
 * 切换当前分类
 */
function toggleTag(value: string) {
    tag.value = value
}

/**
 * 获取当前页的歌单
 */
async function getPlaylistData() {
    isLoading.value = true
    list.splice(0, list.length)
    try {
        const res = await getPlaylistByTag(tag.value as string, page.value, limit.value)
        if (res.code !== 200) await Promise.reject()
        // 保存歌单
        res.playlists.forEach(ele => {
            list.push(ele)
        })
        count.value = res.total
        isLoading.value = false
    } catch (error) {
        message(`获取 ${tag.value} 分类的歌单失败 😪`, "warning")
    }
}

// 监听当前分类的变化 重置页数
watch(tag, (v) => {
    console.log('tag');
    page.value = 1
    $router.push({
        path: $route.path,
        query: {
            tag: v,
            page: 1
        }
    })
})

// 监听页数变化
watch(page, (v) => {
    console.log('page');
    $router.push({
        path: $route.path,
        query: {
            tag: tag.value,
            page: v
        }
    })
})

// 每页条数变化 切换条数需要重置当前页数为1
watch(limit, () => {
    console.log('limit');
    // 若当前就是1 则直接获取最新数据
    if (page.value === 1) {
        // 滚动到顶部
        PubSub.publish('to-top')
        getPlaylistData()
        return
    }

    page.value = 1
    $router.push({
        path: $route.path,
        query: {
            tag: tag.value,
            page: 1
        }
    })
})

// 路由更新获取最新数据
onBeforeRouteUpdate((to) => {
    page.value = to.query.page ? +to.query.page : 1;
    tag.value = to.query.tag ? to.query.tag : '全部歌单';
    getPlaylistData()
})

// 获取数据
onMounted(async () => {
    await getTags()
    console.log(tags);
    await getPlaylistData()
})


</script>
<style scoped>
.tags-btn {
    margin: 10px 0;
}
</style>