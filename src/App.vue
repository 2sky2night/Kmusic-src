<script setup lang="ts">
import themeOverrides from '@/utils/theme'
import Layout from '@/layout/Layout.vue'
import useThemeStore from '@/store/theme';
const themeStore = useThemeStore()
</script>

<template>
  <n-config-provider :theme="themeStore.theme" :theme-overrides="themeOverrides">
    <Layout />
  </n-config-provider>
</template>

<style lang="scss"></style>
