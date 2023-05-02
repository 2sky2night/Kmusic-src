<template>
    <div class="comment-area">
        <div class="hot-comments" v-if="page === 1 && hotList.length">
            <n-h6 prefix="bar" style="margin: 10px 0;">
                热门评论
            </n-h6>
            <ul>
                <CommentCell v-for="item in hotList" :key="item.commentId" :comment="item" :id="id" :type="1"
                    :user-id="userStore.userData.id" />
            </ul>
        </div>
        <div class="my-comment-area">
            <TitleHeader title="发送评论" />
            <div>
                <n-input clearable v-model:value.trim="content" type="textarea" placeholder="输入评论吧~">
                    <template #suffix>
                        <n-button strong secondary type="info" @click="toSendComment">发送</n-button>
                    </template>
                </n-input>

            </div>


        </div>
        <div class="comments" v-if="list.length">
            <div>
                <n-h6 prefix="bar" style="margin: 10px 0;">
                    <span>全部评论</span>
                </n-h6>
                <span style="font-size: 12px;margin-left: 5px;">总共{{ total }} 条</span>
            </div>
            <ul>
                <CommentCell v-for="item in list" :key="item.commentId" :comment="item" :id="id" :type="1"
                    :user-id="userStore.userData.id" />
            </ul>
            <div class="pagination" v-if="pages > 1">
                <n-pagination size="small" v-model:page="page" :page-slot="5" :page-count="pages" />
            </div>
        </div>

        <EmptyPage v-else :show-btn="false" description="还没有人评论呢,快来抢沙发吧! 😎" />
    </div>
</template>
<script lang='ts' setup>
// 组件
import TitleHeader from '@/pages/Home/components/TitleHeader/TitleHeader.vue'
import CommentCell from '@/components/Comment/CommentCell/CommentCell.vue';
import EmptyPage from '@/components/EmptyPage/EmptyPage.vue';
// 钩子
import { onMounted, reactive, ref, watch } from 'vue'
import useUserStore from '@/store/user';
// api
import { getMvComment } from '@/api/MV';
import { sendComment } from '@/api/public/comment';
// 接口
import type { Comment } from '@/api/public/comment/interfaces';
// 工具函数
import message from '@/utils/message';
import { countPage } from '@/utils/computed';
import PubSub from 'pubsub-js';

// 用户仓库
const userStore = useUserStore()
// 自定义属性
const props = defineProps<{ id: number }>()
// 自定义方法
const emit = defineEmits<{
    (e: 'loadDone'): void
}>()
// 评论列表
const list = reactive<Comment[]>([])
// 热门评论
const hotList = reactive<Comment[]>([])
// 当前第几页
const page = ref(1)
// 总共多少页
const pages = ref(0)
// 总共多少条
const total = ref(0)
// 输入的评论
const content = ref('')

// 获取数据
onMounted(getFirstData)


// 获取第一页的评论数据
async function getFirstData() {
    try {
        const res = await getMvComment(props.id, page.value)
        res.code !== 200 ? await Promise.reject() : ''
        // 加载的是第一页的评论,需要处理热门评论
        res.hotComments.forEach(ele => {
            hotList.push(ele)
        })
        // 获取当页的评论
        res.comments.forEach(ele => {
            list.push(ele)
        })
        // 获取总共多少条评论
        total.value = res.total
        // 计算出总共多少页
        pages.value = countPage(20, res.total)
        emit("loadDone")
    } catch (error) {
        message("获取mv评论失败 😴", "error")
    }
}

// 获取评论数据
async function getCommentData() {
    // 滚动到顶部
    PubSub.publish("to-top")
    // 清空当前页的评论
    list.splice(0, list.length)
    try {
        const res = await getMvComment(props.id, page.value)
        res.code !== 200 ? await Promise.reject() : ''
        // 获取当页的评论
        res.comments.forEach(ele => {
            list.push(ele)
        })
    } catch (error) {
        message("获取mv评论失败 😴", "error")
    }
}

// 监听页数发生变化就获取最新的页码评论
watch(page, getCommentData)

/**
 * 发送评论
 */
async function toSendComment() {
    if (!userStore.isLogin && !userStore.cookie) {
        return message("登录后再进行该操作吧~ 😉", "info")
    }
    if (!content.value) {
        return message("输入内容不能为空 😉", "warning")
    }
    try {
        const res = await sendComment(props.id, 1, 1, content.value)
        res.code !== 200 ? Promise.reject(res.message) : message("评论成功 😋", "success")
        // 发送评论成功就插入一条评论
        list.unshift({
            beReplied: [],
            commentId: res.comment.commentId,
            content: res.comment.content,
            ipLocation: { ip: null, location: '未知', userId: res.comment.user.userId },
            user: res.comment.user,
            timeStr: '刚刚',
            time: res.comment.time,
            status: 0,
            parentCommentId: 0,
            owner: true,
            likedCount: 0,
            liked: false
        })
        // 清空输入的内容
        content.value = ''
    } catch (error) {
        message((error as any).response.data.msg, "error")
    }
}

// 检测动态参数的变化,变化需要重新获取对应mv的评论
watch(() => props.id, () => {
    // 重置评论
    hotList.splice(0, hotList.length)
    list.splice(0, list.length)
    getFirstData()
})

</script>
<style scoped>
:deep(.n-h6) {
    margin: 0;
}

.comments>div:first-child {
    display: flex;
    align-items: center;
}

.comments {
    display: flex;
    flex-direction: column;
}

.my-comment-area {
    margin: 15px 0;
    margin-right: 15px;
}
</style>