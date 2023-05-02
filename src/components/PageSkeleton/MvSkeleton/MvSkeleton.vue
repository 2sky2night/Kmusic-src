<template>
    <div class="mv-page-skeleton">
        <div>
            <n-skeleton height="400px" width="98%" style="border-radius: 10px;" />
            <n-skeleton height="30px" style="margin: 5px 0;" width="40%" />
            <n-skeleton height="30px" style="margin: 5px 0;" width="30%" />
            <n-skeleton height="30px" style="margin: 5px 0;" width="30%" />
            <CommentsSkeleton />
        </div>
        <ul class="mv-list">
            <n-skeleton height="100px" style="margin: 10px 5px;" />
            <n-skeleton height="100px" style="margin: 10px 5px;" />
            <n-skeleton height="100px" style="margin: 10px 5px;" />
            <n-skeleton height="100px" style="margin: 10px 5px;" />
            <n-skeleton height="100px" style="margin: 10px 5px;" />
        </ul>
    </div>
</template>
<script lang='ts' setup>
import CommentsSkeleton from '@/components/SkeletonList/CommentsSkeleton/CommentsSkeleton.vue';
</script>
<style scoped lang="scss">
div.mv-page-skeleton {
    display: flex;
    box-sizing: border-box;
    padding-right: 20px;
    margin-right: 30px;
    width: 100%;
    flex-direction: row;
}

div.mv-page-skeleton>div:first-child {
    flex-grow: 1;
}

.mv-list {
    width: 250px;
}

@media screen and (max-width:1000px) {
    ul.mv-list {
        display: grid;
        grid-template-columns: repeat(3,1fr);
        width: 98%;
        gap:  3px 10px;
        div{
            width: 100%
        }
    }

    div.mv-page-skeleton {
        flex-direction: column;
    }
}</style>