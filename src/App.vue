<script setup lang="ts">
import themeOverrides from '@/utils/theme'
import Layout from '@/layout/Layout.vue'
import useThemeStore from '@/store/theme';
import { useRouter } from 'vue-router';
const themeStore = useThemeStore();
(window as any).$push = useRouter().push
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
  // padding: 0 10px;
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
  margin: 15px 0;
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

  .music-list ul.mv .mv-cover {
    min-height: 130px;
  }
}

// 歌单 专辑的布局
.page-layout {
  display: flex;

  .music-infor {
    width: 250px;
    padding: 0 10px;

    .cover {
      width: 190px;
      height: 190px;
    }

    h1 {
      // 歌单 专辑的标题
      word-break: break-all;
      display: none;
    }

    h2 {
      // 歌单 专辑的简介标题
      margin: 10px 0;
    }

    .desc span {
      // 简介
      word-break: break-all;
    }
    .list-data{
      
    }
  }

  .list-time {
    display: flex;

    div {
      margin-right: 10px;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    flex-grow: 1;
    .user{
      display: flex;
      align-items: center;
    }
  }
}

//  小屏幕下的歌单 专辑的布局
@media screen and (max-width:800px) {
  .page-layout {
    flex-direction: column;

    .music-infor {
      box-sizing: border-box;
      width: 100% !important;
      display: flex;
      align-items: center;

      .list-data {
        display: flex;
        div{
          font-size: 13px;
          margin-right: 5px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }

      .infor {
        margin-left: 35px;
        .tags{
          display: none;
        }
        h1 {
          // 歌曲 专辑的标题
          font-size: 20px;
          font-weight: 600;
          display: block;
          margin: 0;
        }

        .desc,
        h2 {
          display: none;
        }
      }

      .cover {
        width: 120px !important;
        height: 120px !important;
      }
    }

    .list {
      margin: 0;
      padding: 0 10px;
      margin-top: 10px;
      h1 {
        // 歌曲 专辑的大标题
        margin: 0;
        display: none;
      }
    }
  }
}
@media screen and (max-width:370px){
  .page-layout .list-data{
      display: none !important;
  }
} 
</style>
