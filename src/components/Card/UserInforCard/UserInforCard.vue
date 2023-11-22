<template>
    <li class="user-infor-card" @click="goToUser">
        <div class="user-infor">
            <div class="user-cover">
                <img :src="data.avatarUrl">
            </div>
            <div class="user-data">
                <div>
                    <span class="text" style="font-size: 14px;font-weight: bolder;">{{ data.nickname
                    }}</span>
                    <n-icon style="position: relative;top:2px;left: 3px;" size="15"
                        :color="data.gender === 1 ? 'skyblue' : 'pink'">
                        <ManOutlinedIcon v-if="data.gender" />
                        <WomanOutlinedIcon v-else />
                    </n-icon>
                    <span v-if="data.vipRights" style="margin-left: 10px;">
                        <img class="vip" v-if="data.vipRights.associator" :src="data.vipRights.associator.iconUrl">
                        <img class="pack" v-if="data.vipRights.musicPackage" :src="data.vipRights.musicPackage.iconUrl">
                    </span>
                </div>

                <div class="follows">
                    <span @click.stop="goToFollow" class="text" style="font-size: 12px;">关注:{{ data.follows }}</span>
                    <span @click.stop="goToFans"  class="text" style="font-size: 12px;">粉丝:{{ data.followeds }}</span>
                </div>
                <n-ellipsis style="max-width: 240px" :tooltip="false">
                    <span style="font-size: 12px; color:var(--text-dark)">{{ data.signature }}</span>
                </n-ellipsis>
            </div>
        </div>
        <n-button size="small" @click.stop="toFollowUser" strong secondary :type="data.followed ? 'info' : 'default'">{{
            data.followed ? '已关注' : '关注' }}</n-button>
    </li>
</template>
<script lang='ts' setup>
import { UserFollow } from '@/api/public/user/interfaces';
import message from '@/utils/message';
import { ManOutlined as ManOutlinedIcon, WomanOutlined as WomanOutlinedIcon } from '@vicons/antd'
import { useRouter } from 'vue-router';
import useUserStore from '@/store/user';

const userStore = useUserStore()

const $router = useRouter()

const props = defineProps<{
    data: UserFollow
}>()

// 去用户界面
function goToUser() {
    $router.push(`/user/${props.data.userId}`)
}
// 关注/取消关注用户
function toFollowUser() {
    if (!userStore.cookie && !userStore.isLogin) {
        return message("请先登录~ 😀","info")
    }
    message("由于安全问题,暂时不能关注/取消关注用户 😎", "info")
}

/**
 * 去关注页面
 */
function goToFollow() {
    $router.push(`/user-follow/${props.data.userId}`)
}

/**
 * 去粉丝页面
 */
function goToFans() {
    $router.push(`/user-fans/${props.data.userId}`)
}

</script>
<style scoped lang="scss">
.user-infor-card {
    height: 80px;
    margin: 10px 0;
    background-color: var(--bg-box-color);
    border-radius: 10px;
    display: flex;
    align-items: center;
    transition: .5s;
    box-sizing: border-box;
    padding: 0 10px;
    cursor: pointer;
    justify-content: space-between;
    border: 1px solid var(--box-border-color);
}

.user-infor-card:hover {
    box-shadow: 0 0 10px var(--color-primary);
}

.user-infor {
    display: flex;

    .user-data {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        img.vip {
            position: relative;
            top: 2px;
            width: 40px;
            height: 15px;
            margin-right: 5px;
        }

        img.pack {
            position: relative;
            top: 1px;
            width: 15px;
            height: 15px;
        }
    }

    img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
}

.follows {
    font-size: 12px;

    span {
        margin-right: 10px;
    }
}

@media screen and (max-width:450px) {
    .user-data>span:last-child {
        display: none !important;
    }
}
</style>