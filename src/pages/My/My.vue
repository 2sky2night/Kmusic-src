<template>
    <div class="page">
        <UserSkeleton v-if="!isOk" />
        <UserInfor v-else :avatar="userInfor.avatar" :create-days="userInfor.createDays" :event-count="userInfor.eventCount"
            :followeds="userInfor.followeds" :follows="userInfor.follows" :gender="userInfor.gender"
            :level="userInfor.level" :nickname="userInfor.nickname" :signature="userInfor.signature"
            :id="userStore.userData.id as number">
            <n-progress style="width:100px;margin-left: 10px;" type="line" :percentage="levelProcess"
                :show-indicator="false" />
        </UserInfor>
        <TabBar :list="list" v-if="isOk" />
        <div class="music-list" v-else style="margin-top: 50px;">
            <SkeletonList :length="12" :cover-radius="10" :text-center="false" />
        </div>

        <RouterView></RouterView>
    </div>
</template>
<script lang='ts' setup>
// 接口
import { UserDetailRes } from '@/api/public/user/interfaces';
import TabBarList from '@/components/TabBar/interfaces';
// 工具函数
import message from '@/utils/message'
// api
import { getUserAccount, getUserLevel } from '@/api/My';
import { getUserDetial } from '@/api/public/user';
import { reactive, onMounted, provide, ref } from 'vue'
// 仓库
import useUserStore from '@/store/user'
// 组件
import UserInfor from '@/components/UserInfor/UserInfor.vue';
import TabBar from '@/components/TabBar/TabBar.vue';
import UserSkeleton from '@/components/PageSkeleton/UserSkeleton/UserSkeleton.vue'

// tabBar数据
const list: TabBarList = [
    { path: '/my/playlist', title: '歌单' },
    { path: '/my/star-artist/1', title: '收藏的歌手' },
    { path: '/my/star-album/1', title: '收藏的专辑' },
    { path: '/my/star-mv/1', title: '收藏的mv' },
]

// 用户仓库
const userStore = useUserStore()
// 用户的信息
const userInfor: any = reactive({})
// 父级路由获取用户id完成才能渲染子路由的数据
const isOk = ref(false)
// 向子路由暴露加载完成
provide('isOk', isOk)
// 用户等级信息
const levelProcess = ref(0)

function setData(resDetail: UserDetailRes) {
    // 更新用户数据
    userStore.setUserData(resDetail.profile.nickname, resDetail.profile.avatarUrl, resDetail.level)
    userInfor.avatar = resDetail.profile.avatarUrl
    userInfor.nickname = resDetail.profile.nickname
    userInfor.level = resDetail.level
    userInfor.eventCount = resDetail.profile.eventCount
    userInfor.gender = resDetail.profile.privacyItemUnlimit.gender
    userInfor.followeds = resDetail.profile.followeds
    userInfor.follows = resDetail.profile.follows
    userInfor.signature = resDetail.profile.signature
    userInfor.createDays = resDetail.createDays
}

onMounted(async () => {
    try {
        // 若本地有数据就不发送该请求获取数据
        if (!userStore.userData.id) {
            const resAccount = await getUserAccount()
            // 设置仓库数据源用户的id
            userStore.setUserId(resAccount.account.id)
            const resDetail = await getUserDetial(resAccount.account.id as number)
            if (resDetail.code !== 200) await Promise.reject();
            setData(resDetail)
        } else {
            // 若本地有数据,使用仓库中的id来获取用户数据
            const resDetail = await getUserDetial(userStore.userData.id as number)
            if (resDetail.code !== 200) await Promise.reject();
            setData(resDetail)
        }
        const res = await getUserLevel()
        if (res.code !== 200) await Promise.reject();
        levelProcess.value = res.data.progress * 100
        isOk.value = true

    } catch (err) {
        message("出错啦!😭", "error")
    }
})
</script>
<style scoped >
.page {
    box-sizing: border-box;
    padding: 0 10px;
    padding-top: 50px;
}

@media screen and (max-width:585px) {
    .page {
        padding: 0;
        padding-top: 10px;
    }
}
</style>