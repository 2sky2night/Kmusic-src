<template>
    <div>
        <UserPlayList v-if="isOk" :uid="userStore.userData.id as number"/>
    </div>
</template>
<script lang='ts' setup>
import useUserStore from '@/store/user';
import UserPlayList from '@/components/UserPlaylist/UserPlaylist.vue';
import { inject } from 'vue';
// 传入当前登陆用户的id
const userStore = useUserStore() 
// 获取父级路由是否加载完成?
const isOk = inject('isOk')
</script>
<style scoped>

</style>