<template>
    <main>
        <router-view v-slot="{ Component }">
            <transition name="page" apper>
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
</template>
<script lang='ts' setup>

</script>
<style scoped>
.page-enter-active {
    animation: pageMove 1s 1 ease-in-out;
}

.page-leave-active {
    animation: pageMove .5s 1 ease-in-out reverse;
}

@keyframes pageMove {
    from {
        transform: scale(.93) translateY(5px);
        opacity: 0;
    }

    to {
        transform: scale(1) translateY(0px);
        opacity: 1;
    }
}

main {
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 10px;
}
</style>