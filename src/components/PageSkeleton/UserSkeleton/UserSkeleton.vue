<template>
    <div class="user-skeleton">
        <div>
            <n-skeleton class="cover" />
        </div>
        <div>
            <n-skeleton class="username" />
            <n-skeleton class="text" />
            <n-skeleton class="text" />
            <n-skeleton class="text" />
            <n-skeleton class="text" />
            <n-skeleton class="text" />
        </div>
    </div>
</template>
<script lang='ts' setup>

</script>
<style scoped lang="scss">
.user-skeleton {
    display: flex;
    width: 100%;
    padding: 0 10px;

    .cover {
        height: 200px;
        width: 200px;
        border-radius: 10px;
        margin-right: 10px;
    }

    .username {
        height: 25px;
        margin: 10px 0;
        width: 50%;
    }
    >div:nth-child(2){
        flex-grow: 1;
    }
}

.text {
    width: 40%;
    margin: 5px 0;
}

@media screen and (max-width:585px) {
    .user-skeleton {
        flex-direction: column;
        align-items: center;
    }

    .cover {
        width: 120px !important;
        height: 120px !important;
        border-radius: 50% !important;
    }

    .user-skeleton>div:nth-child(2) {
        width: 100%;
        display: flex;
        margin-top: 10px;
        flex-direction: column;
        align-items: center;

        >div:nth-child(3) {
            display: none;
        }

        >div:nth-child(4) {
            display: none;
        }

        >div:nth-child(5) {
            display: none;
        }
    }
}
</style>