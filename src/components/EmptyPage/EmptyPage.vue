<template>
    <n-empty description="这一页没有内容呢 😅" size="large" style="margin-top: 30px;font-size: 20px;">
        <template #extra>
            <n-button size="large" @click="$router.push('/')">
                看看别的 ?
            </n-button>
        </template>
    </n-empty>
</template>
<script lang='ts' setup></script>
