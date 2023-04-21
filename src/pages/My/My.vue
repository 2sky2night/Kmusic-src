<template>
    <div class="page">
        <UserInfor v-if="userInfor.avatar" :avatar="userInfor.avatar" :create-days="userInfor.createDays" 
            :event-count="userInfor.eventCount" :followeds="userInfor.followeds"
            :follows="userInfor.follows" :gender="userInfor.gender" :level="userInfor.level"
            :nickname="userInfor.nickname" :signature="userInfor.signature"
        />
        <RouterView></RouterView>
    </div>
</template>
<script lang='ts' setup>
import message from '@/utils/message'
import { getUserAccount } from '@/api/My';
import { getUserDetial } from '@/api/public/user';
import { reactive, onMounted } from 'vue'
import useUserStore from '@/store/user'
import UserInfor from '@/components/UserInfor/UserInfor.vue';
const userStore = useUserStore()
const userInfor: any = reactive({})

onMounted(async () => {
    try {
        const resAccount = await getUserAccount()
        const resDetail = await getUserDetial(userStore.userData.id as number)

        // 若本地没有数据就更新仓库的数据
        if (userStore.userData.id === null) {
            userStore.setUserId(resAccount.account.id)
            userStore.setUserData(resDetail.profile.nickname, resDetail.profile.avatarUrl, resDetail.level)
        }
        userInfor.avatar = resDetail.profile.avatarUrl
        userInfor.nickname = resDetail.profile.nickname
        userInfor.level = resDetail.level
        userInfor.eventCount = resDetail.profile.eventCount
        userInfor.gender = resDetail.profile.privacyItemUnlimit.gender
        userInfor.followeds = resDetail.profile.followeds
        userInfor.follows = resDetail.profile.follows
        userInfor.signature = resDetail.profile.signature
        userInfor.createDays=resDetail.createDays
    } catch (err) {
        message("出错啦!😭", "error")
    }
})

</script>
<style scoped></style>