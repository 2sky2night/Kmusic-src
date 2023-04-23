<template>
    <div class="page">
        <div v-if="userData">
            <UserInfor :avatar="userData.avatar" :create-days="userData.createDays" :event-count="userData.eventCount"
                :followeds="userData.followeds" :gender="userData.gender?true:false" :follows="userData.follows"
                :level="userData.level" :nickname="userData.nickname" :signature="userData.signature">
                <n-button size="small" style="margin-left: 10px;">关注</n-button>
            </UserInfor>
            <UserPlaylist :uid="userData.uid" />
        </div>
    </div>
</template>
<script lang='ts' setup>
import { getUserDetial } from '@/api/public/user';
import UserInfor from '@/components/UserInfor/UserInfor.vue';
import UserPlaylist from '@/components/UserPlaylist/UserPlaylist.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue'

interface UserData {
    avatar: string;
    nickname: string;
    level: number;
    eventCount: number;
    /**
     * 关注
     */
    follows: number;
    /**
     * 粉丝
     */
    followeds: number;
    signature: string | null;
    /**
     * 真为男
     */
    gender: number;
    /**
     * 创建多少天了
     */
    createDays: number;
    /**
     * 是否关注了
     */
    followed: boolean;
    /**
     * 是否关注了我
     */
    followMe: boolean;
    uid: number
}
const $route = useRoute()
// 用户数据
const userData = ref<UserData | null>(null)

onMounted(async () => {
    try {
        if ($route.params.id) {
            // 参数合法
            const res = await getUserDetial(+$route.params.id)
            if (res.code === 200) {
                (userData.value as any) = {};
                (userData.value as UserData).avatar = res.profile.avatarUrl;
                (userData.value as UserData).createDays = res.createDays;
                (userData.value as UserData).eventCount = res.profile.eventCount;
                (userData.value as UserData).followeds = res.profile.followeds;
                (userData.value as UserData).gender = res.profile.gender;
                (userData.value as UserData).level = res.level;
                (userData.value as UserData).nickname = res.profile.nickname;
                (userData.value as UserData).signature = res.profile.signature;
                (userData.value as UserData).followed = res.profile.followed;
                (userData.value as UserData).followMe = res.profile.followMe;
                (userData.value as UserData).follows = res.profile.follows;
                (userData.value as UserData).uid = res.profile.userId;
            }
        }
    } catch (error) {
        
    }

})

</script>
<style scoped>
.page {
    padding-top: 30px;
}

:deep(.music-list) {
    margin-top: 30px;
}
</style>