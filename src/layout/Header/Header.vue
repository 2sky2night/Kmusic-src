<template>
    <header class="header">
        <LogoBtns />
        <Navigation />
        <SearchBar />
        <User />
    </header>
</template>
<script lang='ts' setup>
import SearchBar from './SearchBar/SearchBar.vue';
import Navigation from './Navigation/Navigation.vue';
import LogoBtns from './LogoBtns/LogoBtns.vue';
import User from './User/User.vue';
</script>
<style scoped>
header {
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
}
</style>