<template>
    <div class="page">
        <div v-if="userData">
            <UserInfor :avatar="userData.avatar" :create-days="userData.createDays" :event-count="userData.eventCount"
                :followeds="userData.followeds" :gender="userData.gender ? true : false" :follows="userData.follows"
                :level="userData.level" :nickname="userData.nickname" :signature="userData.signature">
                <n-button size="small" @click="toFollowUser" style="margin-left: 10px;"
                    :type="userData.followed ? 'primary' : ''">{{ followFormat
                    }}</n-button>
            </UserInfor>
            <UserPlaylist :uid="userData.uid" />
        </div>
    </div>
</template>
<script lang='ts' setup>
import { getUserDetial, followUser } from '@/api/public/user';
import UserInfor from '@/components/UserInfor/UserInfor.vue';
import UserPlaylist from '@/components/UserPlaylist/UserPlaylist.vue';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue'
import message from '@/utils/message';
import messagebox from '@/render/MessageBox';

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
// 路由实例对象
const $router = useRouter()

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
        messagebox("此用户id不存在，是否依据此id前往歌手页面? 🧐").then(() => {
            $router.push(`/artist/${$route.params.id}`)
        }).catch(() => {
            $router.back()
        })
    }

})

const followFormat = computed(() => {
    const user = (userData.value as UserData)
    if (user.avatar) {
        if (user.followMe && user.followed) {
            return '已互关'
        } else if (!user.followMe && user.followed) {
            return '已关注'
        } else {
            return '关注'
        }
    } else {
        // 当前用户数据还未加载时返回false
        return false
    }
})

async function toFollowUser() {
    return message("接口异常，禁止使用! 😎","info")
    const user = (userData.value as UserData)
    if (user.followed) {
        // 当前为已关注,则再次点击为取消关注用户
        const res = await followUser(user.uid, 0)
        if (res.code === 200) {
            user.followed = false
        }
    } else {
        // 当前为未关注,再次点击为关注用户
        const res = await followUser(user.uid, 1)
        if (res.code === 200) {
            user.followed = true
        }
    }
}

</script>
<style scoped>
.page {
    padding-top: 30px;
}

:deep(.music-list) {
    margin-top: 30px;
}
</style>