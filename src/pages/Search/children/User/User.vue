<template>
    <div class="search-tab">
        <ul v-if="!isLoading">
            <UserInforCard v-for="user in users" :key="user.userId" :data="user" />
        </ul>
        <n-pagination v-if="total / pageSize > 1 && users.length && !isLoading" style="align-self: center;" :page-slot="6"
            v-model:page="page" :item-count="total" v-model:page-size="pageSize" show-size-picker :page-sizes="pageSizes">
            <template #prefix>
                共 {{ total }} 项
            </template>
        </n-pagination>
        <EmptyPage v-if="!users.length && !isLoading" description="搜索的关键词太犀利了,没有搜索结果呢 🥱" :show-btn="true" />
        <UserSkeletonList :length="pageSize" v-if="isLoading" />
    </div>
</template>
<script lang='ts' setup>
// 接口
import { UserFollow } from '@/api/public/user/interfaces';
// api
import { getSearchUser } from '@/api/Search/User';
// 钩子
import useSearchList from '@/hooks/useSearchList';
import { reactive } from 'vue'
// 工具函数
import message from '@/utils/message';
// 组件
import UserSkeletonList from '@/components/SkeletonList/UserSkeletonList/UserSkeletonList.vue';
import UserInforCard from '@/components/Card/UserInforCard/UserInforCard.vue';

const users = reactive<UserFollow[]>([])
const { keywords, page, pageSize, pageSizes, total, isLoading } = useSearchList(getUserData)

async function getUserData() {
    users.length = 0
    try {
        const res = await getSearchUser(keywords.value, page.value, pageSize.value);
        if (users.length) return;
        if (res.code !== 200) await Promise.reject();
        if (Object.keys(res.result).length === 0) {
            message("搜索结果为空 👀", "info")
            return
        }
        // 获取总数
        total.value = res.result.userprofileCount;
        // 获取用户列表
        res.result.userprofiles.forEach(ele => users.push(ele))
    } catch (error) {
        message("搜索用户失败 UserSkeletonList😛", "warning")
    }
}

</script>
<style scoped>
.search-tab {
    flex-direction: column;
    display: flex;
}
</style>