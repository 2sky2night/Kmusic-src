<template>
    <ul class="comments-skeleton">
        <n-skeleton height="85px" v-for="(item,index) in Array.from({length:10})"
            :key="index" style="margin: 8px 0;border-radius: 10px;"
        />
    </ul>
</template>
<script lang='ts' setup>

</script>
<style scoped>
.comments-skeleton{
    margin-right: 15px;
}
</style>
