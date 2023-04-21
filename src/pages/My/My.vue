<template>
    <div class="page">
        我的😀
        <RouterView></RouterView>
    </div>
</template>
<script lang='ts' setup>
import message from '@/utils/message'
import { getUserAccount } from '@/api/My';
import { getUserDetial } from '@/api/public/user';
import { reactive, onMounted } from 'vue'
import useUserStore from '@/store/user'
const userStore = useUserStore()

onMounted(async () => {
    try {
        const resAccount = await getUserAccount()
        userStore.setUserId(resAccount.account.id)
        const resDetail = await getUserDetial(userStore.userData.id as number)
        userStore.setUserData(resDetail.profile.nickname, resDetail.profile.avatarUrl, resDetail.level)
    } catch (err) {
        message("出错啦!😭", "error")
    }
})

</script>
<style scoped></style>