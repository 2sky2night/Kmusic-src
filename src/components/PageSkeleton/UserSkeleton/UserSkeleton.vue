<template>
    <div class="user-skeleton">
        <div>
            <n-skeleton class="cover" />
        </div>
        <div>
            <n-skeleton class="username" />
            <n-skeleton style="width: 100%;height: 15px;margin-bottom: 10px;" />
            <n-skeleton style="width: 100%;height: 15px;margin-bottom: 10px;" />
            <n-skeleton style="width: 100%;height: 15px;margin-bottom: 10px;" />
            <n-skeleton style="width: 70%;height: 15px;margin-bottom: 10px;" />
            <n-skeleton style="width: 100px;height: 15px;margin-bottom: 10px;" />
        </div>
    </div>
</template>
<script lang='ts' setup>

</script>
<style scoped lang="scss">
.user-skeleton {
    display: flex;
    padding: 0 10px;

    .cover {
        height: 200px;
        width: 200px;
        border-radius: 10px;
        margin-right: 10px;
    }

    .username {
        height: 25px;
        margin-bottom: 10px;
        width: 200px;
    }
}
</style>