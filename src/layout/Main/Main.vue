<template>
    <main>
        <router-view v-slot="{ Component }">
            <transition name="page" apper>
                <keep-alive :include="['Home']">
                    <component :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
    </main>
</template>
<script lang='ts' setup>

</script>
<style scoped>
main {
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
    height: 100%;
}

.page-enter-active {
    animation: pageMove .5s 1 ease-in-out;
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

@media screen and (max-width:585px) {
    main {
        padding: 0;
    }
}
</style>