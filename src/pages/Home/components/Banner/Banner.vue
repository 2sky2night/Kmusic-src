<template>
    <n-carousel :effect="isSmall ? 'slide' : 'card'" loop draggable autoplay
        :prev-slide-style="isSmall ? '' : 'transform: translateX(-92%) translateZ(-500px);'"
        :next-slide-style="isSmall ? '' : 'transform: translateX(-10%) translateZ(-500px);'"
        :style="{ height: isLoading?'0':height + 'px', maxHeight: isLoading?'0':'300px', minHeight: isLoading? 0:'135px'}" show-dots>

        <n-carousel-item :style="{ width: isSmall ? '100%' : '80%', borderRadius: '10px' }" v-for="item in banners"
            :key="item.targetId" @click="goToPage(item.targetId, item.targetType)">
            <img class="carousel-img"  :src="item.imageUrl" @load="countBanners++">
        </n-carousel-item>
    </n-carousel>
    <n-skeleton v-if="isLoading" :style="{ height: height + 'px', borderRadius: '10px' }" width=" 100%" />
</template>

<script lang='ts' setup>
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import type { Banner } from '@/api/Home/interfaces'
import { getBanners } from '@/api/Home'
import { useRouter } from 'vue-router';
import message from '@/utils/message';
import messagebox from '@/render/MessageBox';
const $router = useRouter()
// 正在加载?
const isLoading = ref(true)
// 轮播图数据
const banners: Banner[] = reactive([])
// 是否小屏幕?
const isSmall = ref(false)
// 轮播图高度
const height = ref(0)
// 轮播图加载完成的数量
const countBanners = ref(0)
/**
 * 设置轮播图样式
 */
function setBanner() {
    const rootWidth = document.documentElement.clientWidth
    height.value = rootWidth * 0.3
    if (rootWidth < 600) {
        isSmall.value = true
    } else {
        isSmall.value = false
    }
}

// 获取轮播图数据
onMounted(async () => {
    // 渲染完成时设置轮播图样式
    setBanner()
    // 开启事件监听,窗口变化动态的设置轮播图的高度
    window.addEventListener("resize", setBanner)
    const res = await getBanners()
    if (res.code === 200) {
        res.banners.forEach(ele => {
            banners.push(ele)
        })

        //监听加载完成的数量,若加载完成的数量等于轮播图长度说明加载完成
        watch(countBanners, (v) => {
            if (v === banners.length) {
                isLoading.value = false
            }
        })

    }

})

// 移除事件监听
onUnmounted(() => {
    window.removeEventListener("resize", setBanner)
})

/**
 * 点击轮播图跳转到哪儿去?
 * @param id 
 * @param type 
 */
function goToPage(id: number, type: number) {
    if (type === 1) {
        // 跳转歌曲详情页
        $router.push(`/song/${id}`)
    } else if (type === 1000) {
        // 跳转到歌单
        $router.push(`/playlist/${id}`)
    } else if (type === 3000) {
        messagebox("是否要跳转到站外链接?😢").then(() => {
            location.href=banners[banners.findIndex(ele=>ele.targetId===id)].url
        })
    } else if (type === 10) {
        $router.push(`/album/${id}`)
    } else if (type === 1004) {
        $router.push(`/mv/${id}`)
    }
    else {
        message("是不知道的路由跳转呢,给我说一声马上改bug~😁", "info")
    }
}
</script>


<style scoped>
.carousel-img {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
}
</style>