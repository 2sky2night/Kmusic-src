<template>
    <div class="user-infor">
        <n-image :src="avatar" width="200" style="margin-left: 10px;" />
        <div class="information">
            <div class="top-infor">
                <!--顶部用户信息-->
                <div>
                    <span class="username">{{ nickname }}</span>
                    <n-icon size="20" :color="gender ? '#4098fc' : 'pink'">
                        <ManOutlinedIcon v-if="gender" />
                        <WomanOutlinedIcon v-else />
                    </n-icon>
                </div>
                <div class="level">
                    <span>Lv.{{ level }}</span>
                    <!--预留的关注按钮-->
                    <slot></slot>
                </div>

            </div>
            <ul>
                <!--用户的其他信息-->
                <UserItem title="动态" :value="eventCount" />
                <UserItem title="关注" :value="follows"  @click="goToFollow" />
                <UserItem title="粉丝" :value="followeds" @click="goToFans" />
            </ul>
            <!--用户简介以及创建天数-->
            <div class="more-infor">
                <span>个人介绍: {{ sigFormat }}</span>
                <span>
                    来到云村 {{ createDays }} 天了😀
                </span>
            </div>
        </div>

    </div>
</template>
<script lang='ts' setup>
import UserItem from './components/UserItem/UserItem.vue';
import { computed } from 'vue'
import { useRouter } from 'vue-router';
import { ManOutlined as ManOutlinedIcon, WomanOutlined as WomanOutlinedIcon } from '@vicons/antd'


/**
 * 格式化用户签名
 */
const sigFormat = computed(() => {
    return props.signature ?
        props.signature :
        '这个人太懒了，简介也不写呢。'
})
/**
 * 用户信息组件的自定义属性
 */
const props = defineProps<{
    id: number;
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
    gender: boolean;
    /**
     * 创建多少天了
     */
    createDays: number
}>()
const $router=useRouter()

// 去用户粉丝页面
function goToFans() {
    $router.push(`/user-fans/${props.id}`)
}

// 去用户关注页面
function goToFollow() {
    $router.push(`/user-follow/${props.id}`)
}

</script>
<style scoped lang="scss">
.more-infor {
    font-size: 13px;
    display: flex;
    flex-direction: column;
}

.top-infor>div {
    height: 30px;
    display: flex;
    align-items: center;
}

.user-infor {
    display: flex;

    .username {
        font-size: 30px;
        margin-right: 15px;
    }

    .information {
        width: 100%;
        box-sizing: border-box;
        padding: 0 15px;
    }
}

ul {
    display: flex;
    margin: 10px 0;
    margin-right: 10px;
    padding: 10px 0;
    border-top: 1px solid var(--box-border-color);
}


@media screen and (max-width:585px) {
    .top-infor {
        display: flex;
        justify-content: space-between;
    }

    .more-infor {
        span:nth-child(2) {
            display: none;
        }
    }

    .user-infor {
        align-items: center;
        flex-direction: column;
    }

    :deep(.n-image img) {
        width: 120px;
        border-radius: 50%;
    }

    ul {
        border: none;
        justify-content: space-around;
        margin: 0;
        margin-bottom: 10px;
    }

    .information {
        margin-top: 10px;
        padding-top: 10px;
    }
}

.level {
    font-size: 25px;
}</style>