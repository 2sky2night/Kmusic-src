<script setup lang="ts">
import themeOverrides from '@/utils/theme'
import Layout from '@/layout/Layout.vue'
import useThemeStore from '@/store/theme';
const themeStore = useThemeStore()
</script>

<template>
  <n-config-provider :theme="themeStore.theme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <Layout />
    </n-message-provider>
  </n-config-provider>
</template>

<style lang="scss">
.page {
  width: 100%;
  min-height: 100%;
  position: absolute;
}
</style>
