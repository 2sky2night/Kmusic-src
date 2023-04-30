<template>
    <li class="comment-cell">
        <div>
            <img @click="goToUser(comment.user.userId)" :src="comment.user.avatarUrl" v-once>
        </div>

        <div>
            <div class="user-comment" v-once>
                <span @click="goToUser(comment.user.userId)" class="text" style="font-size: 14px;font-weight: 600;">
                    {{ comment.user.nickname }}:
                </span>
                <span>{{ comment.content }}</span>
            </div>
            <div class="replied-comment" v-once v-if="comment.beReplied.length">
                <span class="text" @click="goToUser(comment.user.userId)">@{{ comment.beReplied[0].user.nickname }}: </span>
                <span style="font-size: 12.8px;">{{ comment.beReplied[0].content }}</span>
            </div>
            <div class="comment-data">
                <div v-once>
                    <span style="margin-right: 5px;">
                        <n-icon size="18" style="position: relative;top:4px;margin-right: 5px;">
                            <MdTime />
                        </n-icon>
                        <span>{{ comment.timeStr }}</span>
                    </span>

                    <span v-if="comment.ipLocation.location">
                        <n-icon size="18" style="position: relative;top:4px;margin-right: 5px;">
                            <LocationOutline />
                        </n-icon>
                        <span>{{ comment.ipLocation.location }}</span>
                    </span>
                </div>

                <div>
                    <n-icon :color="isLike ? 'red' : ''" @click="toggleLike" size="18"
                        style="cursor: pointer;position: relative;top:-1px;margin-right: 3px;">
                        <IosHeart v-if="isLike" />
                        <IosHeartEmpty v-else />
                    </n-icon>
                    <span>{{ likeCount }}</span>
                </div>

            </div>
        </div>
    </li>
</template>
<script lang='ts' setup>
// 钩子
import { useRouter } from 'vue-router';
import { ref } from 'vue';
// 接口
import { Comment,CommentType } from '@/api/public/comment/interfaces';
// api
import { toLikeComment } from '@/api/public/comment';
// 图标
import { MdTime, IosHeart, IosHeartEmpty } from '@vicons/ionicons4'
import { LocationOutline } from '@vicons/ionicons5'
// 工具函数
import message from '@/utils/message';


// 自定义属性
const props = defineProps<{
    /**
     * 评论的数据
     */
    comment: Comment;
    /**
     * 资源的id
     */
    id: number,
    /**
     * 当前登录的用户
     */
    userId: number | null;
    type: CommentType
}>()
// 路由对象
const $router = useRouter()
// 是否喜欢了当前评论
const isLike = ref(props.comment.liked)
// 点赞的数量
const likeCount=ref(props.comment.likedCount)

/**
 * 去用户/我的页面
 * @param id 
 */
function goToUser(id: number) {
    if (props.comment.owner || id === props.userId) {
        // 若是自己的评论跳转用户页面
        $router.push('/my')
    } else {
        $router.push(`/user/${id}`)
    }

}

/**
 * 点赞/取消点赞评论
 */
async function toggleLike() {
    if (!props.userId) {
        return message("请登录后再进行操作 😃", "warning")
    }
    try {
        if (isLike.value) {
            const res = await toLikeComment(props.id, props.comment.commentId, 0, props.type)
            res.code !== 200 ? Promise.reject() : ''
            isLike.value = false
            message("取消点赞成功", "success")
            likeCount.value--
        } else {
            const res = await toLikeComment(props.id, props.comment.commentId, 1, props.type)
            res.code !== 200 ? Promise.reject() : ''
            isLike.value = true
            message("点赞成功", "success")
                likeCount.value++
        }
    } catch (error) {
        message("点赞/取消点赞失败 🙄", "error")
    }

}

</script>
<style scoped lang="scss">
.comment-cell {
    box-sizing: border-box;
    display: flex;
    padding: 20px 10px;
    background-color: var(--bg-box-color);
    border: 1px solid var(--box-border-color);
    margin-right: 20px;
    border-radius: 10px;

    img {
        width: 60px;
        height: 60px;
        cursor: pointer;
        border-radius: 50%;
    }
}

.comment-cell:not(:last-child) {
    margin-bottom: 10px;
}

.comment-cell>div:last-child {
    
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;

    .replied-comment {
        background-color: var(--bg-dark-color);
        padding: 10px;
        border-radius: 10px;
        margin: 5px 0;
    }

    .comment-data {
        display: flex;
        justify-content: space-between;

        div {
            display: flex;
            font-size: 12px;
            align-items: center;
        }

    }
}
</style>