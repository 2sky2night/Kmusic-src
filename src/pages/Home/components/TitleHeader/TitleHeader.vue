<template>
    <div style="padding-left:15px; position: relative" class="title-header">
        <div class="title-area">
            <n-h3 prefix="bar" align-text style="margin: 10px 0;margin-right: 10px;">
                <n-text>
                    {{ title }}
                </n-text>
            </n-h3>
            <!--其他内容-->
            <div>
                <slot name="titleMore" />
            </div>
        </div>
        <!--路由跳转-->
        <div>
            <slot />
        </div>

    </div>
</template>
<script lang='ts' setup>
defineProps<{ title: string }>()
</script>
<style scoped>
.title-area {
    display: flex;
    align-items: center;
}

.title-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>