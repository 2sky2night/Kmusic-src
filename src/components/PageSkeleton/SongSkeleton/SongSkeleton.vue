<template>
    <!--歌曲信息的骨架屏-->
    <div class="page-skeleton">
        <!--歌曲信息-->
        <div class="song-infor">
            <div class="cover-skeleton">
                <n-skeleton style="border-radius: 10px;height: 100%;width: 100%;" />
            </div>
            <div class="song-data">
                <n-skeleton style="height: 20px;margin-bottom: 5px" />
                <n-skeleton style="height: 20px;margin-bottom: 5px" />
                <n-skeleton style="height: 20px;margin-bottom: 5px" />
                <n-skeleton style="height: 20px;margin-bottom: 5px;width: 60%;" />
                <n-skeleton style="height: 20px;margin-bottom: 5px;width: 60%;" />
                <n-skeleton style="height: 20px;margin-bottom: 5px;width: 60%;" />
            </div>
        </div>
        <div class="song-list">
            <n-skeleton style="height: 20px;margin:10px;width: 30%;" />
            <div class="music-list">
                <SkeletonList :coverRadius="10" :text-center="false" :length="3" />
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
import SkeletonList from '@/components/SkeletonList/SkeletonList.vue'
</script>
<style scoped lang="scss">
.page-skeleton {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.song-infor {
    width: 100%;
    height: 300px;
    display: flex;
}

.cover-skeleton {
    width: 300px;
    height: 300px;
}

.song-data {
    margin-left: 10px;
    flex-grow: 1;
}
.song-list{
    width: 100%;
}
</style>