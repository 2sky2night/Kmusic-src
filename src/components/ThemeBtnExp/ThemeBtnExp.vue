<template>
    <div>
        <h1>主题颜色:{{ themeFormat }}</h1>
        <div>
            <n-button @click="toSetTheme(false)">亮色</n-button>
            <n-button @click="toSetTheme(true)">深色</n-button>
        </div>
    </div>
</template>
<script lang='ts' setup>
import useTheme from '@/hooks/useTheme'
const { toSetTheme, themeFormat } = useTheme()
</script>
<style scoped lang="scss">
div>h1 {
    color: var(--color-primary)
}
</style>