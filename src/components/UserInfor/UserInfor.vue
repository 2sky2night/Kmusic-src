<template>
    <div class="user-infor">
        <n-image :src="avatar" />
        <div class="information">
            <div class="top-infor">
                <span>用户名称:{{ nickname }}</span>
                <span>level:{{ level }}</span>
                <span>性别:{{ gender }}</span>
            </div>
        </div>
        <ul>
            <li>动态:{{ eventCount }}</li>
            <li>关注:{{ follows }}</li>
            <li>粉丝:{{ followeds }}</li>
        </ul>
        <div>创建{{ createDays }}天了.</div>
    </div>
</template>
<script lang='ts' setup>
/**
 * 用户信息组件的自定义属性
 */
const props = defineProps<{
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
    signature: string;
    /**
     * 真为男
     */
    gender: boolean;
    /**
     * 创建多少天了
     */
    createDays: number
}>()
</script>
<style scoped></style>