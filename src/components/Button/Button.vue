<template>
    <button :class="`kg-button button-${type}`">
        {{ title }}
    </button>
</template>
<script lang='ts' setup>
interface ButtonProps {
    /**
     * 按钮的标题
     */
    title: string;
    /**
     * 按钮的类型
     */
    type: "info" | "primary"
}
const props = withDefaults(defineProps<ButtonProps>(), {
    type: 'info'
})

</script>
<style scoped lang="scss">
.kg-button {
    cursor: pointer;
    padding: 0 10px;
    height: 30px;
    border-radius: 5px;
    transition: .3s;
}

.button-info {
    color: var(--text-color);
    background-color: var(--bg-box-primary);
}

.button-info:hover {
    background-color: var(--hover-bg-color);
}

.button-primary {
    color: var(--text-color-primary);
    background-color: var(--bg-color-primary);
}

</style>