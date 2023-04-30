<template>
    <div class="comment-area">
        <div class="hot-comments" v-if="!isLoading && hotComments.length">
            <TitleHeader title="热门评论">
                <template #titleMore>
                    <n-button strong secondary size="small" @click="showHot = !showHot">{{ showHot ? '隐藏' : '展开'
                    }}</n-button>
                </template>
            </TitleHeader>
            <transition name="hot">
                <ul v-show="showHot">
                    <CommentCell  :type="type" :userId="userStore.userData.id" :id="id" v-for="item in hotComments" :key="item.commentId"
                        :comment="item" />
                </ul>
            </transition>

        </div>
        <div class="comments" v-if="!isLoading && comments.length">
            <TitleHeader title="全部评论">
                <template #titleMore>
                    <span style="position: relative;top:2px">{{ sumComments }}条</span>
                </template>
            </TitleHeader>
            <ul>
                <CommentCell :type="type" :userId="userStore.userData.id" :id="id" v-for="item in comments" :key="item.commentId"
                    :comment="item" />
            </ul>
            <div class="pagination">
                <n-pagination v-model:page="page" :page-count="pages" />
            </div>

        </div>
        <EmptyPage v-else />
    </div>
</template>
<script lang='ts' setup>
// 组件
import TitleHeader from '@/pages/Home/components/TitleHeader/TitleHeader.vue';
import CommentCell from './CommentCell/CommentCell.vue';
import EmptyPage from '../EmptyPage/EmptyPage.vue';
// 接口
import type { CommentRes, Comment, CommentType } from '@/api/public/comment/interfaces';
// 钩子
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { ref, reactive, onMounted, watch } from 'vue'
// 工具函数
import { countPage } from '@/utils/computed'
import { checkPage } from '@/utils/tools';
// 工具函数
import message from '@/utils/message';
// 仓库
import useUserStore from '@/store/user'

// 用户仓库
const userStore = useUserStore()

// 自定义属性
const props = defineProps<{
    /**
     * 获取评论的方法
     */
    getData: (id: number, page: number, limit?: number) => Promise<CommentRes>;
    /**
     * 目标评论的id
    */
    id: number;
    type: CommentType;
}>()
// 路由元数据
const $route = useRoute()
// 路由对象
const $router = useRouter()
// 当前第几页
const page = ref(0)
// 总共多少页
let pages = 0
// 正在加载
const isLoading = ref(true)
// 热门评论
const hotComments = reactive<Comment[]>([])
// 当前页的评论
const comments = reactive<Comment[]>([])
// 一共有多少条评论
let sumComments = 0
// 是否离开当前页面
let isLeave = false;
// 是否展示热门评论
const showHot = ref(true)

/**
 * 获取(对应页数的评论)评论数据
 */
async function getCommentData() {
    isLoading.value = true
    // 清空当前评论页的数据
    comments.splice(0, comments.length)
    // 若当前加载的不是第一页就不要显示热门评论
    if (page.value !== 1) {
        showHot.value = false
    }
    try {
        const res = await props.getData(props.id, page.value)
        res.code !== 200 ? Promise.reject() : ''

        res.comments.forEach(ele => {
            comments.push(ele)
        })

        isLoading.value = false
    } catch (error) {
        message("获取歌曲评论失败 🤣", "error")
    }
}

onMounted(async () => {
    console.log(checkPage($route.query.page as any));
    // 初始化当前加载的页面
    page.value = checkPage($route.query.page as any)
    try {
        const res = await props.getData(props.id, 1)
        res.code !== 200 ? Promise.reject() : ''
        // 获取总共多少页
        pages = countPage(20, res.total)
        // 获取总共有多少条评论
        sumComments = res.total
        // 获取热门评论
        res.hotComments.forEach(ele => {
            hotComments.push(ele)
        })

        if (page.value === 1) {
            // 获取第一页的评论列表
            res.comments.forEach(ele => {
                comments.push(ele)
            })
        } else {
            // 若不是第一页的话 需要加载对应页面的评论
            await getCommentData()
        }

        isLoading.value = false

    } catch (error) {
        message("获取歌曲评论失败 🤣", "error")
    }


})

watch(page, (v) => {
    $router.push({
        path: $route.path,
        query: {
            page: v
        }
    })
})

watch(() => $route.query, () => {
    if (isLeave) return
    getCommentData()
})

/**
 * 离开当前路由时,设置为离开页面了,不允许加载数据了
 */
onBeforeRouteLeave(() => {
    isLeave = true
})

</script>
<style scoped>
.comment-area {
    display: flex;
    flex-direction: column;
}

.comments {
    display: flex;
    flex-direction: column;
}

.hot-enter-active {
    animation: hot .5s 1 ease-in-out;
}

.hot-leave-active {
    animation: hot .5s 1 ease-in-out reverse;
}

@keyframes hot {
    from {
        opacity: 0;
        transform: scale(.5);
        transform-origin: top center;
    }

    to {
        opacity: 1;
        transform: scale(1);
        transform-origin: top center;
    }
}
</style>