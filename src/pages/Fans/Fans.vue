<template>
    <div class="page">
        <div class="title">
            <span style="font-size: 25px;">{{ name ? name : '未知用户' }}</span>
            <span> 的粉丝</span>
        </div>
        <UserSkeletonList v-if="loadingAll" :length="20" />
        <div class="list">

            <ul v-if="!loadingAll">
                <UserInforCard v-for="item in users" :key="item.userId" :data="item" />
            </ul>
            <n-button :loading="isLoading" style="align-self: center;padding: 0 80px;" strong secondary v-if="hasMore&&!loadingAll"
                @click="() => getFans(+$route.params.id)">加载更多</n-button>
            <EmptyPage v-if="!isLoading && !users.length && !isPrivacy" description="该用户没有粉丝哟 😋" :show-btn="false" />
            <EmptyPage v-if="!isLoading && isPrivacy" description="用户隐私设置不允许查看" :show-btn="true" />
        </div>

    </div>
</template>
<script lang='ts' setup>
// 钩子
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { onMounted, reactive, ref } from 'vue'
// 接口
import { UserFollow } from '@/api/public/user/interfaces';
// api
import { getUserDetial } from '@/api/public/user';
import { getUserFans } from '@/api/Fans';
// 组件
import UserInforCard from '@/components/Card/UserInforCard/UserInforCard.vue'
import UserSkeletonList from '@/components/SkeletonList/UserSkeletonList/UserSkeletonList.vue'
// 工具函数
import message from '@/utils/message';

// 路由对象
const $router = useRouter()
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
// 加载全部数据
const loadingAll = ref(true)

onMounted(() => {
    getData(+$route.params.id)
})

async function getData(id: number) {
    loadingAll.value = true;
    isLoading.value = true;
    try {
        // 获取当前用户的名称
        const resUser = await getUserDetial(id)
        if (resUser.code !== 200) await Promise.reject()
        name.value = resUser.profile.nickname
        // 获取粉丝列表
        await getFans(id)
        loadingAll.value = false;
    } catch (error) {
        message("获取用户粉丝列表失败 😐", "warning")
        $router.replace('/404')
    }
}

/**
 * 获取用户粉丝列表
 * @param id 
 */
async function getFans(id: number) {
    isLoading.value = true
    const resFans = await getUserFans(id, users.length)
    if (resFans.code === 200) {
        resFans.followeds.forEach(ele => {
            users.push(ele)
        })
        hasMore.value = resFans.more
        isLoading.value = false
    } else if (resFans.code === 400) {
        message("用户隐私无权限查看 😀", "warning")
        hasMore.value = resFans.more
        isLoading.value = false
        isPrivacy.value = true
    } else {
        await Promise.reject()
    }
}

// 路由更新获取最新的用户粉丝列表
onBeforeRouteUpdate((to) => {
    users.length = 0;
    isPrivacy.value = false;
    getData(+to.params.id)
})

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