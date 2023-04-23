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
  padding: 0 10px;
}

/**列表相关**/
.music-list {
  display: flex;
  flex-direction: column;
}

.music-list ul {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, minmax(0px, 1fr));
  gap: 10px 20px;
  margin-bottom: 10px;
}

@media screen and (max-width:1130px) {
  .music-list ul {
    grid-template-columns: repeat(5, minmax(0px, 1fr));
  }
}

@media screen and (max-width:950px) {
  .music-list ul {
    grid-template-columns: repeat(4, minmax(0px, 1fr));
  }
}

@media screen and (max-width:700px) {
  .music-list ul {
    box-sizing: border-box;
    padding: 0 10px;
    grid-template-columns: repeat(3, minmax(0px, 1fr));
  }
}

@media screen and (max-width:450px) {
  .music-list ul {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }
}

/**列表相关结束**/

/*收藏页相关的样式*/
.star-page {
  user-select: none;
  display: flex;
  flex-direction: column;
}

.pagination {
  align-self: center;
  margin-bottom: 30px;
}

/*收藏页相关的样式结束*/

.music-list ul.mv {
  grid-template-columns: repeat(4, minmax(0px, 1fr));
  gap: 10px 20px;
}

@media screen and (max-width:1130px) {
  .music-list ul.mv {
    grid-template-columns: repeat(3, minmax(0px, 1fr));
  }
}

@media screen and (max-width:510px) {
  .music-list ul.mv {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }
   .music-list ul.mv .mv-cover{
    min-height: 130px;
   }
}
</style>
