<template>
    <div class="user-photo" :style="{height:height+'px',width:width+'px'}"  :title="name" @click.stop="goToUser">
        <img :src="img">
    </div>
</template>
<script lang='ts' setup>
import useUserStore from '@/store/user'
import { useRouter } from 'vue-router'
// 用户仓库
const userStore = useUserStore()
// 路由实例对象
const $router = useRouter()
// 自定义属性
const props = defineProps<
    {
        img: string;
        id: number;
        name: string;
        width: number;
        height: number;
    }
>()

/**
 * 进入用户或我的页面 若点击的用户是当前用户就跳转我的页面
 */
function goToUser() {
    if (props.id === userStore.userData.id) {
               $router.push('/my')
    } else {
         $router.push(`/user/${props.id}`)
    }
   
}
</script>
<style scoped>
.user-photo{
    cursor: pointer;
}
.user-photo img{
    height: 100%;
    width: 100%;
    border-radius: 50%;
}

</style>