<template>
    <div class="page">
        <div class="title">
            <span style="font-size: 25px;">{{ name ? name : '未知用户' }}</span>
            <span> 的关注</span>
        </div>
        <div class="list">
            <ul v-if="!isLoading">
                <UserInforCard v-for="item in users" :key="item.userId" :data="item" />
            </ul>
            <UserSkeletonList :length="users.length + 20" v-else />
            <n-button style="align-self: center;padding: 0 80px;" strong secondary v-if="hasMore && !isLoading"
                @click="getData">加载更多</n-button>
            <EmptyPage v-if="!isLoading && !users.length && !isPrivacy" description="该用户没有关注任何人哟 😋" :show-btn="false" />
            <EmptyPage v-if="!isLoading && isPrivacy" description="用户隐私设置不允许查看" :show-btn="true" />
        </div>

    </div>
</template>
<script lang='ts' setup>
// 钩子
import { useRoute } from 'vue-router';
import { onMounted, reactive, ref } from 'vue'
// 接口
import { UserFollow } from '@/api/public/user/interfaces';
// api
import { getUserDetial } from '@/api/public/user';
import { getUserFollow } from '@/api/Follows';
// 组件
import UserInforCard from '@/components/Card/UserInforCard/UserInforCard.vue'
import UserSkeletonList from '@/components/SkeletonList/UserSkeletonList/UserSkeletonList.vue'
// 工具函数
import message from '@/utils/message';

// 路由源数据
const $route = useRoute()
// 正在加载
const isLoading = ref(true)
// 还有更多吗
const hasMore = ref(false)
// 用户列表
const users = reactive<UserFollow[]>([])
// 用户名称
const name = ref('')
// 用户是否设置了隐私
const isPrivacy = ref(false)

onMounted(getData)

async function getData() {
    const id = +$route.params.id
    isLoading.value = true
    try {
        // 获取当前用户的名称
        const resUser = await getUserDetial(id)
        if (resUser.code !== 200) await Promise.reject()
        name.value = resUser.profile.nickname
        // 获取当前用户的关注列表
        const resFollow = await getUserFollow(id, users.length)
        if (resFollow.code === 200) {
            resFollow.follow.forEach(ele => {
                users.push(ele)
            })
            hasMore.value = resFollow.more
            isLoading.value = false
        } else if (resFollow.code === 400) {
            message("用户隐私无权限查看 😀", "warning")
            hasMore.value = resFollow.more
            isLoading.value = false
            isPrivacy.value = true
        } else {
            await Promise.reject()
        }

    } catch (error) {
        message("获取用户关注列表失败 😐", "warning")
    }
}

</script>
<style scoped>
.page {
    box-sizing: border-box;
    padding: 10px;
}

.list {
    display: flex;
    flex-direction: column;
}
</style>