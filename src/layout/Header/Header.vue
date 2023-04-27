<template>
    <header class="header">
        <LogoBtns />
        <Navigation />
        <div class="header-item">
            <SearchBar />
            <User />
        </div>
    </header>
</template>
<script lang='ts' setup>
import SearchBar from './components/SearchBar/SearchBar.vue';
import Navigation from './components/Navigation/Navigation.vue';
import LogoBtns from './components/LogoBtns/LogoBtns.vue';
import User from './components/User/User.vue';
</script>
<style scoped>
.header-item{
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
header {
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
}
</style>