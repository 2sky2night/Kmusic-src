<template>
    <!--歌单的骨架屏-->
    <div class="page-skeleton playlist-skeleton">
        <div class="playlist-infor">
            <!--封面-->
            <div class="cover-skeleton">
                <n-skeleton style="border-radius: 10px;height: 90%;width: 90%;" />
            </div>

            <!--文本-->
            <div>
                <div class="title">
                    <n-skeleton text style="width: 100%;height: 30px;" />
                </div>
                <n-skeleton text :repeat="3" style="width: 85%" />
                <n-skeleton text style="width: 60%" />
            </div>

        </div>
        <div class="songs-list">
            <!--文本-->
            <div class="title">
                <n-skeleton text style="width: 70%;height: 30px;" />
            </div>

            <n-skeleton text :repeat="2" />
            <n-skeleton text style="width: 60%" />
            <!--歌曲列表-->
            <SongItemSkeletonList :length="10" />
        </div>
    </div>
</template>
<script lang='ts' setup>

</script>
<style scoped lang="scss">
.playlist-infor {
    width: 200px;
    .title{
        display: none;
    }
}

.songs-list {
    flex-grow: 1;
}

.cover-skeleton {
    height: 190px;
    width: 190px;
}

/*小屏幕下的页面骨架屏*/
@media screen and (max-width:800px) {
    .page-skeleton {
        flex-direction: column;
    }

    .playlist-infor {
        display: flex;
        width: 100%;
        .title{
            display: block;
        }
        .cover-skeleton+div {
            flex-grow: 1;
        }
    }

    .songs-list {
        .title {
            display: none;
        }
    }
}
</style>