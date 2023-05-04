<script setup lang="ts">
import themeOverrides from '@/utils/theme'
import Layout from '@/layout/Layout.vue'
import useThemeStore from '@/store/theme';
import useUserStore from '@/store/user'
import useMusicStore from './store/music';
import { useRouter } from 'vue-router';
import { setLocal } from './utils/localStorage';
// 主题仓库
const themeStore = useThemeStore();
//  用户仓库
const userStore = useUserStore();
// 音乐仓库
const musicStore = useMusicStore();

(window as any).$push = useRouter().push;

// 根据用户仓库当前的登录状态决定是否获取用户喜欢的歌曲列表
if (userStore.isLogin && userStore.cookie) {
  //  若当前用户登录了,就获取最新的用户喜欢的歌曲列表 以及 用户收藏的专辑列表
  userStore.toGetSongLikeList()
  userStore.toGetStarAlbum()
}

// 检测到用户仓库的方法执行,将最新的数据保存在仓库中
userStore.$onAction(({ after }) => {
  after(() => {
    setLocal('userData', userStore.userData)
  })
})

// 检测到音乐仓库的方法执行,就将最新数据保存在仓库中
musicStore.$onAction(({ after }) => {
  after(() => {
    setLocal('musicData', musicStore.$state)
  })
})

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
  display: flex;
  align-items: center;
}

/*收藏页相关的样式结束*/

// 收藏的mv
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

// 收藏的mv结束 //


// 歌单 专辑的布局
.page-layout {
  display: flex;

  .list-data {
    margin-top: 10px;
  }

  //  音乐的信息
  .music-infor {
    width: 240px;
    padding: 0 10px;

    .cover {
      width: 190px;
      height: 190px;
    }

    h1 {
      // 歌单 专辑的标题
      word-break: break-all;
      display: none;
      margin: 0;
    }

    h2 {
      // 歌单 专辑的简介标题
      margin: 10px 0;
    }

    .desc span {
      // 简介
      word-break: break-all;
    }
  }

  .list-time {
    display: flex;
    align-items: center;

    button {
      font-size: 12px;
    }

    div {
      margin-right: 10px;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    flex-grow: 1;

    .user {
      display: flex;
      align-items: center;
    }

    h1 {
      margin: 0;
    }
  }

  .check-desc {
    display: none;
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

        div {
          font-size: 13px;
          margin-right: 5px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }

      .infor {
        margin-left: 35px;

        .tags {
          display: none;
        }

        h1 {
          // 歌曲 专辑的标题
          font-size: 20px;
          font-weight: 600;
          display: block;
          margin: 0;
          margin-bottom: 10px;
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

    .check-desc {
      display: inline-block;
    }
  }
}

// 小屏幕下的歌单数据
@media screen and (max-width:370px) {
  .page-layout .list-data {
    display: none !important;
  }
}

//  小屏幕下的歌单时间
@media screen and (max-width:430px) {
  .page-layout .list-time {
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}

//  小屏幕下的歌单 专辑的布局结束  //

// 页面的骨架屏
.page-skeleton {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  padding-top: 20px;
}

// 小屏幕下的页面骨架屏
@media screen and (max-width:800px) {
  .page-skeleton {
    flex-direction: column;
  }
}

// 评论的介绍信息盒子
.comment-infor {
  margin-right: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  border: 1px solid var(--box-border-color);
  background-color: var(--bg-box-color);

  .cover {
    width: 80px;
    height: 80px;
    margin-right: 10px;

    img {
      max-width: 80px;
      max-height: 80px;
    }
  }

  .infor-data {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-grow: 1;
    height: 80px;
  }
}

@media screen and (max-width:500px) {
  .comment-infor {
    .cover {
      display: none;
    }
  }
}

// 评论的介绍信息盒子 结束

// 标签tag
.tag-active {
  background-color: var(--color-primary-light);
  color: var(--color-primary)
}

.tag:hover {
  background-color: var(--color-primary-light);
  color: var(--color-primary)
}

.tag {
  margin-bottom: 5px;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 10px;
  font-size: 13px;
}

// 标签样式结束</style>
