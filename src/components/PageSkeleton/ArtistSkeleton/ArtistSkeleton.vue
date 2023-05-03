<template>
    <div class="artist-skeleton">
        <div class="cover">
            <n-skeleton height="250px" width="250px" style="border-radius: 50%;" />
        </div>
        <div class="infor">
            <n-skeleton height="40px" width="250px" />
            <n-skeleton height="30px" width="300px" style="margin: 10px 0;" />
            <n-skeleton height="30px" width="250px"  style="margin: 10px 0;" />
            <n-skeleton height="30px" width="100px" style="margin: 10px 0;"  />
        </div>

    </div>
</template>
<script lang='ts' setup></script>
<style scoped>
.artist-skeleton{
    display: flex;
    margin-bottom: 10px;
}
.infor{
    margin-left: 50px;
    padding-top:30px;
}
@media screen  and (max-width:600px){
    .artist-skeleton{
        flex-direction: column;
        align-items: center;
    }
    .infor{
        margin-top: 20px;
        margin-left: 10px;
        padding: 0;
        align-self: start;
    }
}
</style>