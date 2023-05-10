<template>
    <div class="page">
        <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
            <template #footer>
                <n-button @click="$router.push('/')">看看别的?  👀</n-button>
            </template>
        </n-result>
    </div>
</template>
<script lang='ts' setup>

</script>
<style scoped>
.page{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>