网易云

# 一、接口

​	接口巨多，我只想拿出我想实现的接口。

​	很多分页的页面，我都需要根据查询参数来加载数据，否则会导致刷新后无法当前页的数据，并且也需要对路由的查询参数进行检验。

​	当然也不止分页的页面，只要接口需要传入查询参数的，基本都需要根据查询参数来获取数据，防止刷新后无法当前页的数据

​	**对于接口interface，我只对需要使用的数据进行定义，不想定义太多数据让自己都不方便使用。**

## 	1.登录（只能使用二维码登录，其他都无法使用）

说明: 二维码登录涉及到 3 个接口,调用务必带上时间戳,防止缓存

#### 1. 二维码 key 生成接口

说明: 调用此接口可生成一个 key

**接口地址 :** `/login/qr/key?timestamp=xxxx`

调用此接口的结果为：

![image-20230419153407340](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230419153407340.png)

#### 2. 二维码创建接口

说明: 调用此接口传入上一个接口生成的 key 可生成二维码图片的 base64 和二维码信息,可使用 base64 展示图片,或者使用二维码信息内容自行使用第三方二维码生成库渲染二维码

必选参数: `key`,由第一个接口生成

可选参数: `qrimg` 传入后会额外返回二维码图片 base64 编码

**接口地址 :** `/login/qr/create`

**调用例子 :** `/login/qr/create?key=xxx&timestamp=xxxx&qrimg=true`

​	可以根据响应回来的qrimg的值来生成二维码，可以直接将qrimg的值设置为图片的src，可以自动生成二维码，若要使用第三方库另说。

![image-20230419153630758](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230419153630758.png)

#### 3. 二维码检测扫码状态接口

说明: 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)

必选参数: `key`,由第一个接口生成

**接口地址 :** `/login/qr/check`

**调用例子 :** `/login/qr/check?key=xxx&timestamp=xxxx`

调用可参考项目文件例子`/public/qrlogin.html` (访问地址:http://localhost:3000/qrlogin.html)

当响应的状态码为803时则说明扫码授权登录成功，会返回cookies。

生成二维码----创建二维码----获取扫码状态-----获取扫码状态---.....----获取扫码状态(登录成功)

当创建好二维码得到base64的编码后将其解码渲染成图片后，就一直调用这个接口来获取当前扫码的状态当为801时等待扫码，802 待用户确认，803 授权成功（登录成功），800二维码过期等待用户刷新二维码

## 2.首页

​	首页我需要展示轮播图、新专辑上架、推荐的歌单、mv、歌手、歌曲。

​	调用的接口：轮播图/banner、新专辑上架/album/newest、推荐的歌单/personalized、mv/personalized/mv、歌手/artist/list、歌曲/personalized/newsong。

## 3.头部

### 搜索框	

​	调用的接口：搜索热词/search/hot/detail、搜索联想词/search/suggest

​	需要调用搜索热词接口，在输入框获取焦点且没有输入内容时显示**搜索热词**和**搜索的历史记录**，在输入内容后就调用搜索联想词接口。

### 路由导航

​	路由导航区，有首页、发现、用户、登录四个导航链接，登录后显示用户链接，未登录显示登陆链接

​	发现有3个二级导航链接，推荐歌单、歌手、歌曲

​	用户有4个路由链接：歌单，收藏的歌手、mv、专辑

### 功能按钮

​	控制页面的前进与后退

### 用户

​	用户的功能面板，展示用户基本信息

​	未登录：主题切换、登陆

​	登陆：主题切换、退出登陆、查看用户的播放历史、每日推荐

## 4.发现

​	二级路由全是分页	

### 	1.歌单

​	调用的接口：歌单分类/playlist/catlist、歌单列表/top/playlist

​	需要先获取到歌单的分类，当修改歌单分类时就去获取歌单列表。

​	默认获取全部歌单，**也可以通过解析路由查询参数来加载对应分类或某一页的数据**

### 	2.歌曲

​		调用的接口：推荐新音乐/personalized/newsong

​		默认获取第一页的数据，**也可以通过解析路由查询参数来加载某一页的数据**

### 	3.歌手

​		调用的接口：/artist/list 

​	默认获取第一页的数据，**也可以通过解析路由查询参数来加载对应类型歌手或某一页的数据**

## 5.我的

​	调用接口:账户信息/user/account（为了获取当前登陆的用户id）、用户详情信息/user/detail（获取用户其他信息：关注、粉丝..）,**下列二级路由都是需要分页的，且能够通过路由参数自动解析需要加载多少也的数据**

### 	1.我的歌单 (传uid)

​		调用接口:/user/playlist 

### 	2.收藏的专辑（需要cookie）

​		调用接口:/album/sublist

### 	3.收藏的歌手列表（需要cookie）

​		调用接口：/artist/sublist

### 	4.收藏的mv（需要cookie）

​		调用接口:/mv/sublist

## 6.歌曲详情

​	调用接口:歌曲详情数据/song/detail、歌曲的评论（分页）/comment/music、相似的歌曲/simi/song、包含这首歌的歌单/simi/playlist

 	**根据路由参数来解析需要加载评论的数据。**

## 7.mv详情

​	调用接口：mv详情/mv/detail、相似mv(/simi/mv)、mv的评论（分页）/comment/mv、获取mv的播放路径/mv/url、收藏/取消收藏mv(/mv/sub)

 	**根据路由参数来解析需要加载评论的数据**，加载第一页时有热评。

## 8.歌单详情

​	调用接口:歌单详情/playlist/detail、歌单的其他数据（播放了、评论、是否收藏等等）/playlist/detail、歌单中的歌曲（分页）/playlist/track/all、、收藏/取消收藏歌单/playlist/subscribe

## 9.专辑详情

​	调用接口：专辑详情信息/album、收藏/取消收藏专辑/album/sub

## 10.歌手详情

​	调用接口:歌手的详情信息/artist/detail

### 	1.热门歌曲

​		调用接口:歌手的热门歌曲/artists

### 	2.专辑

​		调用接口:歌手的专辑/artist/album(分页)

​	根据路由查询参数来加载某一页的数据

### 	3.mv

​		调用接口:歌手的/artist/mv(分页)

​	根据路由查询参数来加载某一页的数据

## 11.歌手的全部歌曲

​	调用接口：歌手的全部信息/artist/songs（分页）

​	根据路由查询参数来加载某一页的数据

## 12.歌单评论

​	调用接口：歌单评论/comment/playlist（分页），加载第一页时有热评。

​	根据路由查询参数来加载某一页的数据

## 13.粉丝列表

​	调用接口：粉丝列表/user/followeds（分页）、关注或取消关注用户/recommend/songs

​	根据路由查询参数来加载某一页的数据

## 14.关注列表

​	调用接口：关注列表/comment/playlist（分页）、关注或取消关注用户/recommend/songs

​	根据路由查询参数来加载某一页的数据

## 15.专辑的评论

​	调用接口：.专辑的评论/comment/playlist（分页），加载第一页时有热评。

​	根据路由查询参数来加载某一页的数据

## 16.搜索

调用接口：/cloudsearch	

根据路由查询参数来加载某一页、某一个类型、某个关键字的数据

歌曲、歌手、歌单、专辑、用户

![image-20230420130254540](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230420130254540.png)

## 17.用户的播放记录

​	调用接口:用户的播放记录/user/record(分页)

​	根据查询参数获取某一页的数据

## 18.每日推荐

​	调用接口：每日推荐/recommend/songs（登录后使用）

# 二、页面

### 1.一级路由

首页、发现、我的、登录、用户、歌曲详情、mv详情、歌单详情、专辑详情、歌手详情、歌手的全部歌曲、歌单的评论、粉丝列表、关注列表、专辑的评论、搜索、用户的播放记录、每日推荐、404（404页面）、403(权限页面)

### 2.二级路由

#### 发现

推荐的歌单、推荐的音乐、推荐的歌手

#### 歌手（此一级路由需要调用歌手详情接口）

热门歌曲、 歌手的专辑、歌手的mv 

#### 搜索(默认搜索单曲)

搜索单曲、搜索歌手、搜索歌单、搜索用户、搜索专辑、搜索的mv

#### 用户（此一级路由需要调用用户详情信息接口）

用户歌单、收藏的专辑、收藏的歌手、收藏的mv

# 三、项目选用技术栈

​	框架：vue3

​	组件库：naiveui

​	框架衍生：vue-router、pinia

​	插件库:axios、@vicons/ionicons5（图标库，可以像组件一样使用图标）、vfonts（组件库适用字体）、unplugin-auto-import、unplugin-vue-components(自动导入组件，图标库还是需要自己手动引入)、nProgress（加载条）、qrcode.vue（生成二维码图片的vue组件）vue-img-cutter裁剪图片、artplayer播放音频、

# 四、主题切换

​	通过naiveui自带的api可以修改组件库内置的样式，通过给根元素移除和增加class值来实现css变量的覆盖，从而达到主题切换，后续只需要持续补充深色和亮色的css变量即可。

​	主题切换需要使用pinia仓库，来实现全局获取当前主题。

## // 仓库

```vue
import { defineStore } from "pinia";
import type { ThemeStoreState } from "./interfaces";

const data: ThemeStoreState = {
    /**
     * 主题颜色,null为亮色
     */
    theme: null
}

const useThemeStore = defineStore("theme", {
    state() {
        return data
    },
    actions: {
        /**
         * 设置主题颜色
         * @param value - 主题颜色的值 
         */
        setTheme(value: typeof this.theme) {
            // 设置组件库的主题
            this.theme = value
            // 设置html的class值
            if (value && value.name) {
                document.documentElement.classList.add("dark")
            } else {
                document.documentElement.classList.remove("dark")
            }
        }
    },
    getters: {
        themeFormat({ theme }) {
            return theme ? '深色模式' : '亮色模式'
        }
    }
})

export default useThemeStore
```

## // app.vue（设置组件库的主题）

```
<script setup lang="ts">
import useThemeStore from './store/theme';
const themeStore = useThemeStore()
</script>

<template>
  <n-config-provider :theme="themeStore.theme">
    <div>哈哈</div>
  </n-config-provider>
</template>

<style scoped lang="scss">
div {
  color: var(--color-primary)
}
</style>

```

## 使用案例

```
// 组件
<template>
    <div>
        <h1>主题颜色:{{ themeFormat }}</h1>
        <div>
            <n-button @click="toSetTheme(false)">亮色</n-button>
            <n-button @click="toSetTheme(true)">深色</n-button>
        </div>
    </div>
</template>
<script lang='ts' setup>
import useTheme from '@/hooks/useTheme'
const { toSetTheme, themeFormat } = useTheme()
</script>
<style scoped lang="scss">
div>h1 {
    color: var(--color-primary)
}
</style>
```



```ts
//hooks
import useThemeStore from '@/store/theme';
import { storeToRefs } from 'pinia';
import { darkTheme } from 'naive-ui';
export default function useTheme() {
    const themeStore = useThemeStore()
    const { theme, themeFormat } = storeToRefs(themeStore)

    /**
     * 设置主题颜色
     * @param flag - 真为深色,假为亮色
     */
    function toSetTheme(flag: boolean) {
        flag ? themeStore.setTheme(darkTheme) : themeStore.setTheme(null)
    }

    return {
        themeFormat,
        toSetTheme, theme
    }
}

```

# 五、页面布局

​	上中下结构，上header、中main、下音乐播放器。创建layout组件对其进行封装

## 1.头部

​	头部分为左中右三个区域，分别展示左（前进后退按钮）、中（导航栏）、右（用户功能面板）

### 1.1前进后退功能按钮

```vue
<template>
    <n-space align="center">
        <img src="../../../assets/vue.svg">
        <button @click="navigate(false)">
            <n-icon size="20">
                <IosArrowBack />
            </n-icon>
        </button>
        <button @click="navigate(true)">
            <n-icon size="20">
                <IosArrowForward />
            </n-icon>
        </button>
    </n-space>
</template>
<script lang='ts' setup>
import { useRouter } from 'vue-router'
import { IosArrowBack, IosArrowForward } from '@vicons/ionicons4'
const $router = useRouter()
/**
 * 控制页面的前进和后退
 * @param value  - 真前进假后退
 */
function navigate(value: boolean) {
    value ? $router.forward() : $router.back()
}
</script>
<style scoped lang="scss">
button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    transition: .3s;
    background-color: var(--bg-color);
}

button:hover {
    background-color: var(--hover-bg-color);
}

img {
    width: 30px;
    height: 30px;
}

// 在650px以下隐藏前进后退
@media screen and (max-width:520px) {
    button {
        display: none;
    }
}
</style>
```

### 1.2 导航栏

​	先自己手写了一个需要渲染成导航项的路由表，二级路由链接通过组件库的dropdown显示出来。封装一个导航项组件。

​	对于一级路由点击就切换高亮效果，并跳转对应的路由页面，对于登录和我的这两个导航栏来说，得需要在写登录功能之后才能过来完善，基本思路就是根据用户仓库中记录的cookie值或isLogin来判断当前用户的登录状态，来控制显示和隐藏。

​	对于二级路由，点击谁跳转对应的路由链接即可。

​	当路由路径不处于导航项的路由表时，应该要将所有的激活效果消除掉。

​	对应有二级路由的按钮，不能被点击

​	访问了二级路由，需要高亮一级路由的导航项

​	当用户登录时，显示我的，当未登录时显示登录按钮

### 1.3用户菜单栏（未完成）

​	使用组件库真的是太方便了，navieui赛高!!使用的下拉菜单栏，自己手动渲染用户的值和主题板块。**菜单栏项应该需要根据用户登录状态来动态渲染菜单栏。** 只需要监听仓库的登录状态即可对菜单栏进行动态的渲染，在初始化时也需要判断仓库中登录过，来初始化菜单栏。

​	 退出登录时，需要重置仓库和清空本地数据(reset方法不生效咋回事？？？)

​	用户头像、等级、用户信息的动态渲染（未完成）

```
<template>
    <n-dropdown trigger="click" :options="option" @select="handleSelect">
        <!--用户头像需要从仓库中获取-->
        <n-avatar round :size="40" src="https://p4.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg" />
    </n-dropdown>
</template>
<script lang='ts' setup>
import { reactive } from 'vue'
import options from './options'
const option = reactive(options)

// 点击某一项时的回调,可以根据v的值来执行对应的事情.
function handleSelect(v: string) {
    console.log(v);
}

</script>
<style scoped>
div {
    align-items: center;
    cursor: pointer;
    user-select: none;
}
</style>
```

### 1.4搜索框（未完成）

​	失去焦点时，缩小输入框，当获取焦点时，输入框变大，在说去焦点时弹出下拉菜单。

​	当未输入内容时候，下拉菜单显示历史记录搜索热词等，当输入内容后显示实时联想词。

```
<template>
    <n-dropdown style="width:250px" :show="isFocus" :options="keywords?optionsKeywords:optionsHistory" @select="handleSelect">
        <div class="search-bar" :style="{ width: isFocus ? '200px' : '150px' }">
            <n-input size="small" round autosize style="width: 100%" @focus="handler(true)" @blur="handler(false)"
                v-model:value="keywords" type="text" placeholder="搜索歌手/歌曲">
                <template #prefix>
                    <n-icon>
                        <IosSearchIcon />
                    </n-icon>
                </template>
            </n-input>
        </div>
    </n-dropdown>
</template>
<script lang='ts' setup>
import { IosSearch as IosSearchIcon } from '@vicons/ionicons4'
import { ref } from 'vue'
const isFocus = ref(false)
const keywords = ref("")

/**
 * 输入框失焦/焦点的处理函数
 */
function handler(flag: boolean) {
    if (flag) {
        isFocus.value = true
    } else {
        isFocus.value = false
    }
}
/**
 * 用户选择内容后的处理函数
 */
function handleSelect() {

}
/**
 * 历史记录和搜索热词的渲染配置项
 */
const optionsHistory = [
    {
        label: '滨海湾金沙，新加坡',
        key: 'marina bay sands',
        disabled: true
    },
    {
        label: '布朗酒店，伦敦',
        key: "brown's hotel, london"
    },
    {
        label: '亚特兰蒂斯巴哈马，拿骚',
        key: 'atlantis nahamas, nassau'
    },
    {
        label: '比佛利山庄酒店，洛杉矶',
        key: 'the beverly hills hotel, los angeles'
    }
]

/**
 * 搜索联想词的渲染配置项
 */
const optionsKeywords = [
    {
        label: '联想词1',
        key: 'marina bay sands',
        disabled: true
    },
    {
        label: '联想词2',
        key: "brown's hotel, london"
    },
    {
        label: '联想词3',
        key: 'atlantis nahamas, nassau'
    },
    {
         label: '联想词4',
        key: 'the beverly hills hotel, los angeles'
    }
]
</script>
<style scoped lang="scss">
.search-bar {
    transition: .3s;
    width: 150px;
    margin: 0 5px;
}
</style>
```

## 2.主页

​	所有页面都集中在这个视图里面。

## 3.音乐播放器（未完成，准备最后来做）

​	音乐播放器。

​	监听仓库的方法**setPlayingSong**执行，就代表当前需要获取歌曲来进行播放，以此来发送请求获取数据，当前只做了最最最基础的点击立即播放就执行仓库方法**setPlayingSong**。



# 六、axios二次封装

​	在请求拦截器时开启进度条，在响应拦截器关闭进度条，在响应拦截器中获取响应回来的真实消息，并暴露出公共方法。

```
import axios from 'axios'
import nProgress from 'nprogress'
import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

const request = axios.create({
    baseURL: 'http:127.0.0.1:3000'
})

// 请求拦截器
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // 开启进度条
    nProgress.start()
    return config
}, (error: AxiosError) => {
    return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((response: AxiosResponse) => {
    // 停止进度条
    nProgress.done()
    //  返回服务器响应的真实内容
    return response.data
})

/**
 * 封装公共方法，因为每个接口都需要传入时间戳来禁用缓存,所有在公共方法中统一配置params
 */
export default {
    get<T = any>(url: string, config: AxiosRequestConfig = { params: {} }): Promise<T> {

        Reflect.set(config.params, 'timestamp', Date.now())
        console.log(config.params);

        return request.get(url, config)
    },
    post<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
        Reflect.set(config.params, 'timestamp', Date.now())
        return request.get(url, config)
    }
}
```

# 七、配置路由

​	加载路由时开启进度条、渲染完成时关闭进度条，对应权限页面需要进行拦截

```
import { createRouter, createWebHashHistory } from 'vue-router'
import nProgress from 'nprogress';
import routes from "./routes";
import { useUserStoreWithout } from '@/store/user';

const userStore = useUserStoreWithout()

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    // 滚动条置于窗口顶部(滑动到顶部)
    // scrollBehavior() {
    //     return {
    //         top: 0
    //     }
    // }
})


// 全局前置守卫
router.beforeEach((to, from, next) => {
    nProgress.start()

    if (to.meta.auth) {
        // 访问权限页面
        if (userStore.isLogin && userStore.cookie) {
            // 登录状态并有cookie值才能访问该页面
            next()
            return
        } else {
            // 未登录,不能访问
            (window as any).$message.error('请先登录!');
            next(from.path)
            return
        }
    }

    // 访问无权限页面
    console.log('访问无权限页面');
    next()
})

// 全局后置守卫
router.afterEach(to => {
    // 关闭进度条
    nProgress.done()
    document.title = to.meta.title as string || to.path
})

export default router
```

# 八、api

## 1.登录

```ts
import { KeyCode, CodeState, CreateCode, ResponseType } from './interfaces'
import request from '@/utils/request'

/**
 * 获取二维码的key
 * @returns 
 */
export const getKeyCode = () => {
    return request.get<ResponseType<KeyCode>>('/login/qr/key')
}

/**
 * 创建二维码
 * @param key - unikey
 * @returns 
 */
export const createCode = (key: string) => {
    return request.get<ResponseType<CreateCode>>('/login/qr/create', { params: { key, qrimg: true } })
}

/**
 * 检查扫码状态
 * @param key 
 * @returns 
 */
export const getCodeState = (key: string) => {
    return request.get<CodeState>('/login/qr/check', { params: { key } })
}
```

# 九、页面

## 1.登录

​	登录页面需要渲染完成时，生成二维码，将二维码渲染在页面中去，创建好二维码后需要开启定时器不断的发送请求，获取当前二维码的扫描状态，暂定500发一次请求获取二维码扫码状态，当组件被卸载时关闭定时器。

​	若当前仓库中，记录着用户已经登陆，则不能进入该页面，后退页面

### 	1.生成二维码轮询获取二维码状态

​		生成二维码---》创建二维码，开启定时器，不断调用二维码状态的接口。

### 	2.登录成功后跳转至首页？

​			登录成功后，将用户cookie保存进入仓库，并设置用户登录状态，跳转至首页

### 	3.用户登录后再次返回登陆页应该禁止访问(bug)

​		实现了，但是url地址的hash值和标题还是有问题

## 2.我的（有问题，问题已经完美解决）

​	访问我的这个路由需要先获取用户信息和账户信息接口。**（加载闪烁如何解决？？）**

**由于接口问题，所有的分页路由组件都不能通过参数初始化数据，如何解决？**

​	基本布局

![image-20230421195444570](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230421195444570.png)

### 	歌单页面

​		封装成组件，将来会在用户页面使用。获取用户歌单接口有问题，limit查询参数无效，会直接返回所有的歌单数据😅

### 	收藏的专辑

​	收藏页面都是分页的，使用动态参数代表当前分页。

### 收藏的mv

​	收藏页面都是分页的，使用动态参数代表当前分页。

### 收藏的歌手

​	收藏页面都是分页的，使用动态参数代表当前分页。

### 问题解决

​	mbg，接口问题，纯纯的，除了请求第一页offset=0会返回总页数，其他都不会返回总页数。只需要解决总页数就行了是吧，哈哈哈，我知道了，若请求的参数大于1我就先请求第一页的数据为了获取总页数，这样总行了吧。

## 3.用户页面

​	使用封装好的组件：用户信息和歌单，修改下就完成了。

​	不过关注接口有问题写完了才发现，无语。。

## 4.首页

​	1.轮播图

​	轮播图需要根据当前访问终端，以此来调用接口时传递不同的参数。算了，龟儿调用时传递的参数不一样返回的数据结构也不一样，有点😅😅

​	2.推荐的歌手、歌单、歌曲、mv

​	3.新蝶上架

​	4.专属推荐（需要登陆）

#### 组件

##### 1.轮播图

![image-20230425130449596](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230425130449596.png)

​	轮播图我想实现的是，当所有图片加载完成时，才销毁骨架屏，而不是请求完成就销毁骨架屏。

​	方案一（失败）：我的想法是，有多少个轮播图就生成这样长度的一个数组，数组的每一项都是一个promise，每当一个图片加载完成就设置状态为resolve，使用Promise.all方法，对数组进行监听，当全部加载完成时设置isLoading为false，就算全部加载完成了。

​	方案二(成功)：请求成功后可以得到轮播图的长度，通过一个变量来代表轮播图加载完成的数量，一个轮播图请求成功就让改变量++，若此变量的值为轮播图的长度了，说明加载完成了，设置isLoading为false，代表加载完成。



##### 	2.首页板块标题头部

![image-20230425130535713](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230425130535713.png)

​	提供默认插槽来放查看更多的路由链接，提供更多插槽，在标题附件添加其他内容。

##### 3.推荐的歌单

![image-20230425213504923](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230425213504923.png)

##### 4.推荐的歌曲

![image-20230425213531939](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230425213531939.png)

##### 5.推荐的歌手

![image-20230425213548866](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230425213548866.png)

##### 6.推荐的mv

![image-20230425213608404](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230425213608404.png)

##### 7.新蝶上架

![image-20230426084555531](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230426084555531.png)

##### 8.每日推荐

左右结构，左边是歌曲，右边是推荐原因的文字

![image-20230426130041115](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230426130041115.png)

## 5.每日推荐

​	调用获取每日推荐的接口，直接渲染即可。

​	功能：查看当日推荐的歌曲

![image-20230427193303631](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230427193303631.png)

## 6.歌单详情页

​	歌单详情数据 歌单动态数据 歌单某一页的歌曲.

​	基本完成，功能：

​	1.点击用户头像可以进入用户页面。(若歌单作者是自己，跳转我的页面)

​	2.点击收藏和取消收藏按钮可以收藏/取消收藏歌单（若歌单创建者是自己不显示此按钮）

​	3.点击分页加载不同页的歌曲数据，路由的前进后退也会引起数据的加载获取当前页的数据。

​	4.可以查看到最近收藏该歌单的用户

​	5.查看大图

​	6.若当前歌单为登录用户自己的歌单，可以进行修改封面，修改歌单名称、删除歌曲

![image-20230428144605533](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230428144605533.png)

![image-20230428112552453](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230428112552453.png)

## 7.歌曲详情页

​	~~两个组件组成，歌曲信息和评论区组件。~~

​	~~评论区组件是公共的组件，需要把获取数据的函数给他，让他在不同页面下获取不同的数据~~

​	歌曲详情页，获取歌曲详情信息，获取相似歌曲，获取包含这首歌的歌单推荐，播放歌曲、喜欢/取消喜欢歌曲，添加到歌单，评论，播放相似歌曲，跳转到相似歌曲中去。

![image-20230428211624237](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230428211624237.png)

![image-20230428212137966](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230428212137966.png)

![image-20230428212150891](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230428212150891.png)

​	添加到歌单功能需要提前获取当前登录用户自己歌单，我在仓库中保存着用户自己的歌单。点击添加到这个按钮后弹出模态框用户点击任意歌单即可添加对应的歌单。

​	创建歌单:用户点击创建歌单，弹出模态框创建歌单点击确定即可创建歌单

​	删除歌单：点击歌单项对应的删除图标即可删除歌单

## 8.专辑页面

​	获取专辑数据，收藏/取消收藏专辑，根据本地的用户数据获取当前用户对此专辑的收藏状态，点击跳转mv页面

![image-20230430172501083](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230430172501083.png)

![image-20230430172447561](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230430172447561.png)

## 9.歌曲评论、歌单评论、专辑评论

​	通过封装的comment组件完成。

## 10.mv详情页

​	播放mv、调节mv的分辨率、查看发送评论、收藏mv、相似的mv

完善提交评论、评论用户的vip展示，mv页面、歌手页面、粉丝关注页面、发现、搜索页面

### 1.视频播放器

找合适的视频播放器插件花了好久的时间，靠。artPlayer,看着文档完成对视频的分辨率调整的功能，也就是多加一个配置项settings，在settings中实现想要完成的功能即可。

![image-20230502111931562](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230502111931562.png)

### 2.mv详情信息

​	mv的作者列表，点击可以跳转歌手页面；其他数据；收藏取消收藏mv

### 3.相似的mv

​	获取相似的mv，媒体查询在移动端下有不同的体验

### 4.mv的评论

​	展示mv的评论，当点击某一页时容器滚动到顶部，发送评论

### 5.当路由更新时，加载对应mv的数据

​	使用监听器监听路由的动态参数，从而获取对应mv的数据

## 11.歌手详情页

​	歌手基本信息、歌手的热门单曲、专辑、mv

## 12.歌手的全部歌曲

 	根据路由参数加载对于页数，参数若非法加载第一页数据

## 13.用户粉丝、关注页

​	展示用户的粉丝列表和关注页面，按需加载。

## 14.播放的历史记录

​	每次播放一首歌曲就记录在仓库中，该页面直接渲染历史记录。不能删除历史记录

## 15.发现页面

1.推荐的歌单

​	通过tag来获取对应tag的歌单。查询参数有tag和page来获取对应标签、页数的歌单

2.推荐的歌手

​	可以通过上方的筛选框筛选对应系列的歌手

3.推荐的新音乐100首

​	采用分页的方式浏览，避免DOM太多导致页面卡顿

## 16.搜索

搜索模块有搜索框和搜索页

### 	1.搜索框

​		搜索框需要在未输入内容时显示搜索热词和搜索的历史记录，在输入内容后显示搜索建议。搜索框获取热搜数据传递给未输入内容时的组件，再传递给热搜组件。

#### 			1.1 未输入内容时的组件

​		需要展示两个板块：搜索的历史记录和热搜

​	热搜，展示当前的热搜列表，点击某一项时进入搜索页面，并设置当前搜索仓库的keywords和搜索的历史记录。

#### 			1.2 输入内容后显示搜索建议组件

​		在输入内容后发送请求获取搜索建议，注意防抖，点击后获取数据，渲染即可，点击对应分类（分类有歌曲、专辑、歌单、歌手）跳转到对应类别的页面。

### 2.搜索页面

​	若未提供搜索关键词keywords查询参数进入该页面会直接返回上一层。

​	搜索是这样工作的

​	初次加载时：首先在输入框中输入内容，回车后将关键词作为keywords查询参数进入搜索页面并将keywords保存为搜索的历史记录仓库中，进入搜索页面后解析查询参数，保存当前搜索的keywords为keywordsNow，并将keywordsNow注入到歌曲、专辑等子路由中，子路由加载是根据此keywords来发送请求获取对应类型的搜索结果，将结果渲染到页面中

​	第二次搜索其他内容：依旧在输入框中输入内容，点击回车将回车后将关键词作为keywords查询参数进入搜索页面并将keywords保存为搜索的历史记录仓库中，搜索页面有路由更新的钩子，若查询参数keywords更新时，将keywordsNow的赋值为最新的keywords，子路由通过onBeforeROuterUpdate钩子来检查当前查询参数是否更新，更新就重置页数，并获取最新的数据。

​	获取上一页下一页：点击分页后，子页面监听器监听page的值，值更新就routerpush并更新路由的查询参数page，onBeforeROuterUpdate钩子捕获到后加载对应页数的数据即可。

​	分页大小发生变化：重置页数为第一页，并replace路由栈，通过onBeforeROuterUpdate捕获到加载对应数据即可，若本来就第一页会导致路由不更新onBeforeROuterUpdate捕获不到，我们只需要强制进行更新即可，并通过pubsub发送事件通知容器滚动条滚动即可。



## 音乐播放器

​	有底部的小型播放器和展开查看歌词的播放器，我先做底部的小型播放器。

### 	一、底部播放器

#### 	1.歌曲进度条

​		通过audio标签获取到播放歌曲的长度，即可显示歌曲的时间。

![image-20230509094358390](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230509094358390.png)

​	audio标签有当前播放的时间currentTime（此属性可读可写可以控制进度条）和当前歌曲的总时长duration，还有几个事件canplaythrough、timeupdate

​	timeupdate为当前播放器的时间发生变化时会触发的事件，可以用来更新当前播放歌曲的时间

​	canplaythrough为歌曲已经全部加载完毕时的回调，可以在这个处理函数中获取当前歌曲的总时间。

​	音乐仓库中保存中当前歌曲的总时长和当前播放的时间。

​	步骤：

​	1.时长、当前时间获取：在audio标签加载完成时获取到歌曲的总时长，将总时长保存在仓库中，同时在audio标签在更新当前播放的歌曲时间时去更新仓库中的当前播放的时间。

​	2.进度条：我是用的是navie ui 自带的滑动器组件，将当前歌曲的总时长和当前值作为属性传递给该组件即可完成时间的显示和更新。

​	3.进度条控制歌曲时间：滑动器组件有内置的事件，在滑动滑动条时自动触发，设置audio标签当前播放时间即可。

#### 	2.暂停歌曲

​	通过audio标签的api来暂停歌曲，并通过audio的事件监听来记录当前歌曲的播放状态从而控制图标的显示切换。

![image-20230509122322143](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230509122322143.png)

#### 	3.音量控制：

​	依旧通过navie的滑动器组件，绑定一个值，滑动时更新audio标签的volume值即可。并且每次加载音乐时音量保持用户设置的一致

#### 	4.歌曲信息展示实时歌词显示

​	歌曲信息展示，若当前歌曲没有歌词就展示歌手名称。

#### 	5.播放器加载时或播放器未播放歌曲时的样式

​	未播放歌曲时playingSong的值为初始值，

#### 	6.循环播放和固定播放和随机播放

​		修改播放歌曲的方式。当歌曲播放完成后ended事件，通过音乐仓库中播放歌曲的方式来决定下一首歌曲的播放，当然播放的歌曲是在播放列表中的。注意，若是单曲循环播放（audio标签的loop属性为真则不会触发ended事件）

​	1.顺序播放：调用仓库的nextSong即可。

​	2.循环播放：通过audio标签的属性loop进行设置即可，绑定动态属性若playType===1则为true即可循环播放

​	3.随机播放：记录下当歌曲id的索引，在数组范围内产生一个随机数，若数字不为当前歌曲的id索引即可以播放。

#### 	7.上一首下一首：

​	根据仓库中音乐播放的方式决定，若顺序播放则调用仓库顺序上下首歌曲的api接口，若为单曲循环上下首都使用audio.load（）来重置播放进度，若为随机播放则调用随机播放的接口即可。

#### 	8.显示当前帧的歌词

​	解析完歌词后，通过当前播放的歌曲的秒数，可以显示对应秒数的歌词：

![image-20230509204225758](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230509204225758.png)

​	我的思路：

​	1.将解析后的歌词数组（lyricArray）重构下，给数组每个元素添加一个标志位，该标志位代表着当前播放时间currentTime是否超过了当前歌词（true为超过，false为未超过）

```ts
export interface Lyric {
	time:number; 歌词出现的时间
	text:string; 歌词文本
	flag:boolean; 当前播放时间是否超过了歌词出现时间
}
```

​	2.监听currentTime，当currentTime更新时，遍历整个lyricArray，若currentTime大于等于ele.time，说明当前播放时间超过了歌词显示的时间，设置标志位为true反之设置为false。（其实我们只需要显示数组中最后一个标志位为true的歌词即可）

​	3.实时歌词显示：获取歌词数组中最后一个标志位为true的歌词即可。



### 	二、播放列表

​		用户每次通过有音乐列表页播放歌曲时都会把歌曲列表存放在播放列表仓库中。

​	所以只要有歌曲列表的页面都需要修改，同时也需要修改SongItem，点击播放时发送自定义事件，通知组件当前播放歌曲了，更新仓库中的播放列表。**为了达到写最少的代码完成此功能，我只好封装歌曲列表组件SongList了，封装好就只需要写一次业务逻辑其他就只需要将改组件复制贴贴就行。**，但是通过抽屉和下拉菜单播放音乐我觉得不太好实现更新播放列表，放弃这个功能，若通过这两个方式播放歌曲不能更新播放列表 ,硬要写其实也能写，通过pubsub通知到SongList组件即可

​	想想多少个页面用到了SongItem组件？**历史记录**、**歌单**、**歌手页的热门歌曲组件**、**专辑**、**每日推荐**、**歌手的全部歌曲**、**发现页的发现歌曲**、**搜索页面的歌曲**

​	点击播放歌曲的时候会将当前歌曲列表作为最新的播放列表（注意深拷贝，否则再次在当前歌曲列表进行下一首播放，对播放列表操作时页面的歌曲顺序也会受影响，因为都是引用的同一份指针），点击添加到下一首播放会将当前歌曲添加到播放列表中对应下一首歌曲中去。**当前歌曲不能进行添加下一首的操作**

​	播放列表的展示：直接展示即可

​	上一首下一首：上一首下一首，通过找到当前播放的歌曲，去获取到上一首或下一首歌曲，然后调用仓库方法setPlayingSong然后footer组件监听到仓库方法执行获取最新数据即可。



​	

​	

### 三、解析歌词

​	原本响应回来的歌词有歌手的信息，所以我截取掉了。

​	由于音乐播放器是以秒为单位的，所以时间字符串任然需要格式化，需要转化成秒。

​	**下面是1.0版本的，有问题，因为有时候响应的歌词后半段也有'}'的存在，所有需要重写考虑**

#### 	1.0版本

```
console.log(lyricString?.slice(lyricString.lastIndexOf('}'))
    .replace('}', '') // 获取歌词
    .split('\n')  // 以回车为歌曲的分隔符创建歌词数组
    .filter(ele => ele)  // 过滤处空数组
    .map(ele => {
        // 获取分隔符]索引 将其一分为二 当前元素为 [MM:SS.SS]文本
        const index = ele.indexOf(']')+1;
        return {
            time: ele.slice(0, index),
            text: ele.slice(index)
        }
    })
)
/**
 * 格式化时间[分分:秒秒.秒秒]为数字秒
 * @param timeString 
 */
export const timeStringToNumber = (timeString: string) => {
    // 将 [分分:秒秒.秒秒]截取出来
    const [min, sed] = timeString.replace('[', '').replace(']', '').split(':').map(ele=>parseFloat(ele));
    return min * 60 + sed;
}

/**
 * 格式化歌词 为 一个数组 数组元素为time text的对象
 * @param lyricString 
 * @returns 
 */
export const lyricFormat = (lyricString: string) => {
    return lyricString.slice(lyricString.lastIndexOf('}'))
        .replace('}', '') // 获取歌词
        .split('\n')  // 以回车为歌曲的分隔符创建歌词数组
        .filter(ele => ele)  // 过滤处空数组
        .map(ele => {
            // 获取分隔符]索引 将其一分为二 当前元素为 [MM:SS.SS]文本
            const index = ele.indexOf(']') + 1;
            return {
                time: timeStringToNumber(ele.slice(0, index)),
                text: ele.slice(index)
            }
        })
}
```

​	![image-20230509202435509](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230509202435509.png)

![image-20230509202840069](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230509202840069.png)

​		![image-20230509203712334](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230509203712334.png)

#### 	2.0版本

​		考虑后半段可能也会存在花括号的情况，所以不能以花括号为截取点。我换成了用indexOf，查找多个字符，会响应找到的第一个字符的下标。

​		截取前半部分：顺序查找到第一个出现时间轴的索引，然后截取掉前半部分的其他信息。

​		截取后半部分：查找出现{"t":的字符串的索引，获取到第一个索引，截取掉即可，不过要注意有些歌词没有后半部分需要考虑-1的情况，-1就不截取即可。

​		顺利截取完成其他就按照之前的样子来即可。

```ts
/**
 * 格式化时间[分分:秒秒.秒秒]为数字秒
 * @param timeString 
 */
export const timeStringToNumber = (timeString: string) => {
    // 将 [分分:秒秒.秒秒]截取出来
    const [min, sed] = timeString.replace('[', '').replace(']', '').split(':').map(ele => parseFloat(ele));
    return min * 60 + sed;
}

/**
 * 格式化歌词 为 一个数组 数组元素为time text的对象
 * @param lyricString 
 * @returns 
 */
export const lyricFormat = (lyricString: string) => {
    //  找到第一个出现时间轴的位置
    let index = lyricString.indexOf('[00:')

    // 前半部分的歌曲信息截取掉
    const b = lyricString.slice(index)

    // 截取后半段出现其他信息的部分
    const index2 = b.indexOf('{"t":')

    // 若后半段没有其他信息就不截取,反之则截取 随便把多余的回车截取了
    const c = index2 === -1 ? b : b.slice(0, index2 - 1)


    return c
        .split('\n')  // 以回车为歌曲的分隔符创建歌词数组
        .filter(ele => ele)  // 过滤处空数组
        .map(ele => {
            // 获取分隔符]索引 将其一分为二 当前元素为 [MM:SS.SS]文本
            const index = ele.indexOf(']') + 1;
            return {
                time: timeStringToNumber(ele.slice(0, index)),
                text: ele.slice(index)
            }
        })
}
```

![image-20230510094615189](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230510094615189.png)

#### 	3.0版本

​	可以看到有些text为空串，我认为需要过滤处空串。不过在使用中进行处理就行。

### 	四、歌词桌面

​		理想状态是想做成这样（当然不包括歌词每一个字的高亮，太难了吧~）：

<img src="C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230510102524570.png" alt="image-20230510102524570" style="zoom: 25%;" />

​	分两个模块：音乐控制器和歌词滚动		

#### 	1.音乐控制器 (移动端下封面换成歌词)

![image-20230510123502167](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230510123502167.png)

#### 	2.歌词

​		我想就是用一个ul列表，定高的容器，里面渲染对应的歌词，当前唱的是某个歌词就高亮并带动滚动条使其滚动到容器视图里面。

​	还是使用一样的解决方式，通过解析出来的歌词，给每个元素添加一个标志位代表当前播放时间是否超过该歌词超过设置true，否则设置为false。数组中最后一个标志为true的则为当前需要高亮的歌词。

​	通过监听播放器的currentTime，获取当前播放的时间，遍历歌词数组设置对应歌词的标志位，最后再获取到歌词数组中最后一个标志位为true的索引，即代表当前正在唱的歌曲索引。

​	**高亮歌词**，就是列表渲染，当前正在唱的索引有，每个歌词的索引也有，直接动态绑定class，currentIndex===index就设置高亮样式即可。

```ts
// 监听当前播放歌曲的时间更新歌词列表的标志位
watch(() => playingSong.value.currentTime, (v) => {
    lyricArr.forEach(ele => {
        if (v >= ele.time) {
            // 若当前播放的时间超过该歌词的时间 设置标志为true 代表时间已经超过当前歌词时间
            ele.flag = true
        } else {
            ele.flag = false
        }
    })
    // 获取到最后一个标志位为true的,说明当前正在唱这个歌词
    const index = lyricArr.findLastIndex(ele => ele.flag)
    // 若当前没一个标志位为true的,则设置索引为0
    currentIndex.value = index !== -1 ? index : 0
})
```

​	**高亮歌词**在视图的居中显示：

​	1.方案一，通过渲染完成时获取到歌词中的每一项DOM元素，当currentIndex更新时，获取到对应索引的DOM元素就通过scrollIntoView()api滚动进入页面 最简单的方式。而且该api还可以选择滑动时的水平和垂直的位置。

![image-20230510134736155](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230510134736155.png)

```
scrollIntoView({ behavior: "smooth", block: "center" })
```

![image-20230510135019697](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230510135019697.png)

#### 	3.点歌曲控制进度

​	这个也是可以实现的哈哈哈，毕竟歌曲数组中每个元素都有时间，点击时设置传入要跳转的歌词的时间，emit通知父组件修改audio标签的currentTime即可，会更新仓库同时更新audio标签的进度，还是挺简单的。

#### 	4.纯音乐

​		无歌词

#### 	5.极简模式

​		隐藏歌词。

![image-20230510142615166](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230510142615166.png)

#### 	6.响应式布局

​	![image-20230510150122624](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230510150122624.png)



## 动态参数的页面

​	给所有动态参数的页面添加功能---动态参数更新重新获取数据，若获取数据失败，跳转到404页面。

## 退出登陆

 清空仓库中的用户数据以及登陆状态和cookie，清除播放的历史记录和搜索记录。

## 查看使用localStorage的大小

```js
function getUseSize() {
  var size = 0;
  for(item in window.localStorage) {
    if(window.localStorage.hasOwnProperty(item)) {
      size += window.localStorage.getItem(item).length;
    }
  }
  console.log('使用：' +  (size / 1024).toFixed(2) + 'KB')
}
getUseSize()
```



# 	遇到的坑

#### 	1.父子路由执行时机的问题

​		一级路由我的，需要发送请求获取用户id，获取到用户id保存到仓库中。二级路由中，我的歌单也需要这个用户id来发送请求，但是由于组件的执行先后顺序导致二级路由先发送请求，但是仓库初始化用户id为null，导致出错，我的解决方案是在父级路由提供一个变量注入provide到子路由中去，初始化为false表示未加载完成，用这个变量v-if控制子路由的创建，当一级路由获取到用户id，设置为true，从而渲染这个子路由组件。

#### 	2.查询参数不变更的问题

​	在某个页面时，我只更新查询参数，会发现路由路径不会变化，试了很多方法都不行，最后还是使用动态参数解决这个问题，动态参数可以在参数更新后加载路径。还是通过监听路由动态参数的变化来重新设置当前需要加载的页数，还需要监听页数，页数发生变化了就重新加载数据。

```ts
  // 监听页数发生变化就更新路由
    watch(page, (v) => {
        $router.push({
            name,
            params: {
                page: v
            }
        })
        getData()
    })

    // 路由的动态参数发生变化就更新page的值
    watch(() => $route.params, (v) => {
        console.log(v);
        page.value=+v.page
    }, { deep: true })
```

#### 	3.元素撑不开高度

​	main标签不被子元素撑开，所以内置的滚动条一直不显示，所以我只好自己来设置main标签的高度，通过获取到page的高度即可。不过main标签和page是父子组件的关系，必须要page组件加载完毕才能去获取其page的高度，否则document.queryselect是获取不到page元素的，所以只好在page组件里面通过自定义事件，通知main组件去获取page的高度即可。无用功。。

#### 4.路由切换时需要让滚动条滚动到顶部

​	也就是路由切换后需要让滚动条滚到顶部，但是咋们这个滚动条不是在window上的，而是在一个容器上的，所以只能操作DOM了。还好组件库内置有这个方法，通过ref获取到layout组件，组件实例内置scrollTo这个方法，太棒了~~

#### 5.source标签的src属性更新了不会重新加载资源

​	在写播放器的时候，我是动态的根据当前播放的歌曲的资源路径来修改标签的src属性，可是修改只会source标签不会重新加载资源。查了下才知道若要重新加载资源需要重新渲染source标签。

#### 6.其实查询参数的更新也是可以重新加载路由的

​	不过下面这种需要注意的时，当离开路由的时候，需要停止加载数据，否则会出错。

![image-20230427204714441](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230427204714441.png)



![image-20230427213858570](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230427213858570.png)

![image-20230428094237296](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230428094237296.png)

#### 7.js如何检测文本是否溢出？

​	只需生成两个文本元素，一个是被裁剪的容器，一个是未被裁剪的容器，获得两个容器后，对比高度就知道文本是否存在溢出了

#### 8.对于对象类型的响应式数据应该如何初始化？ts

下面这种更好,不要传入联合类型声明null，否则折磨死你

![image-20230428214134016](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230428214134016.png)

#### 9.trycatch不能捕获异步代码的异常

​	下列代码若code===200时，catch是无法捕获到Promise.reject的，因为trycatch本身就只会不会同步的异常，对于async await来说本身就是把异步函数变成同步代码来进行处理，所以只要遇到错误就会进行捕获，而直接的调用Promise.reject是一个语法糖而已，new Promise((_,reject)=>reject())，依然是一个异步的操作，trycatch是无法捕获到异步操作的异常的，所以要使用这玩意并且要使得trycatch捕获需要加上await即可。

​	错误做法：（trycatch无法捕获异步代码）

![image-20230502150349642](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230502150349642.png)

​	正确做法：

![image-20230502150739513](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230502150739513.png)

#### 10.根据路由参数变化重新获取最新数据的最优解

​	真的都是自己一点一点慢慢摸索出来的。

###### 	1.watch+onRouterBeforeLeave监听路由源数据

​	最开始是使用watch的方式监听路由元数据，监听路由更新就去获取数据，但是这样会有问题，当离开路由时同样也会执行监听器的回调，这样就会造成异常的请求。所以需要使用onRouterBeforeLeave，在离开路由时设置标志禁止watch回调去请求数据，watch执行时机比onRouterBeforeLeave慢，所以就可以使用在离开路由时不执行watch回调（但其实还是执行了，只是判断了标志的值来决定后续代码是否执行）

​	如下

![image-20230503153654375](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230503153654375.png)

###### 	2.使用onBeforeRouteUpdate

​	这个钩子只会在路由更新时调用，查询参数更新、params参数更新时都会执行里面的回调，**并且只会作用于当前路由中，非常强大的钩子**。在此钩子还能接收到to、from路由源数据参数，从而获取最新数据。

![image-20230503154046944](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230503154046944.png)

#### 11.清空数组的方式

​	array.length=0

​	arr.splice(0,arr.length)

#### 12.通过component来实现动态图标

​	component内置组件可以根据is属性的值来渲染对应的组件，is属性可以是字符串也可以是组件，提前注册好可能出现的组件，is属性的值就可以是变量，变量的值可以是字符串，该字符串就是组件名称，会根据组件名称来渲染对应组件。

​	下图就是可以根据suggestType的值来渲染对应名称的组件

![image-20230506202819735](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230506202819735.png)

![image-20230506202841743](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230506202841743.png)

![image-20230506202917189](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230506202917189.png)

​	提前注册好对应名称的组件

![image-20230506203039417](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230506203039417.png)



#### 13.对于没有ts类型声明的第三方库怎么添加类型说明防止编译失败

​	https://zhuanlan.zhihu.com/p/235430632

#### 14.背景图片平铺

```css
body{
    margin:0px;
	background: url(images/bg.png) no-repeat;
	background-size:100% 100%;
	background-attachment:fixed;
}

```

#### 15.vite打包报错

js emit is not supported，注意package.json中，修改yarn build执行的脚本为： vite build而不是vue-tsc&&vite build

![image-20230510153125217](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230510153125217.png)

# 十、仓库

## 	1.用户仓库

```ts
// 用户的初始数据
const data: UserStoreState = {
    isLogin: false,
    cookie: null,
    userData: {
        id: null,
        nickname: null,
        avatar: 'https://p4.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg',
        level: 0,
        ids: [],
        idAlbums: [],
        myPlaylists: []
    }
}
```

​	保存用户的信息，以及登录的状态(根据登录状态来判断用户是否登录)，以及用户喜欢的歌曲、收藏的专辑列表、用户自己的歌单（用于描述某个歌曲的喜欢状态和专辑的收藏状态以及用户当前创建的歌单），在登陆后会获取。

​	在登陆用户后会将用户信息保存在本地中。

### 仓库初始化

​	若本地有cookie值，就从本地加载数据，并设置登录状态为true，若本地记录着用户信息，就从本地初始化仓库。

​	仓库中记录用户基本信息以及用户喜欢的歌曲列表。每次在进入页面时，检测用户登录状态，获取当前用户最新的收藏的音乐列表，而不是在进入我的页面时候才进行获取。

![image-20230430154921143](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230430154921143.png)





## 	2.主题仓库

​		设置页面的主题颜色。在四步已经配置完成。

### 仓库初始化

​	仓库中的数据保存在本地中，用于记录用户设置的主题。

​	当仓库数据源更新后，本地同步更新。

​	初始化加载时若本地中加载数据，若为深色模式还需要手动的设置html的class值为dark

## 3.歌曲数据仓库

​	1.用于保存当前播放的歌曲的基本信息PlayingSong

​	歌曲id、name、艺术家们、专辑信息、正在播放？、是否喜欢等基本信息。

​	2. 保存播放过的歌曲 history

## 4.仓库数据的持久化

​	我准备在app组件中定义仓库方法的监听器，只要监听仓库方法的执行通过after这个api可以将最新的数据源保存在本地中

## 5.搜索仓库

​	获取搜索仓库用来保存搜索的历史记录和当前搜索的关键词

# 十一、组件

## 1.歌单(完成，不能v-once)

​	歌单，点击歌单进行路由跳转，跳转到歌单详情页面，**歌单有插槽，可以用来显示歌单作者的信息**

​	不能v-once，因为动画效果依据数据源的，而且有懒加载的情况

![image-20230421202144968](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230421202144968.png)

​	完工~

![image-20230422182439026](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230422182439026.png)

## 2.歌手（未完成）

​	歌手歌曲数量可以，作为歌手更多信息插槽传递即可。

点击x首、x张进入歌手的歌曲或歌手的专辑页

![image-20230421202209835](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230421202209835.png)

完成~

![image-20230423193438489](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230423193438489.png)

## 3.专辑（完成，不能v-once）

点击封面跳转到专辑详情，点击歌手名称跳转到歌手详情页 。



![image-20230421202238681](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230421202238681.png)

完工~

![image-20230423190324822](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230423190324822.png)

​	

## 4.歌曲(未完成)

![image-20230421202356657](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230421202356657.png)

​	双击播放歌曲、右键打开菜单键、点击更多弹出抽屉、抽屉可以查看更多歌曲数据、正在播放的歌曲需要高亮。

​	正在播放的歌曲高亮其实很简单，音乐仓库保存当前播放的歌曲信息包括id，若当前仓库播放的歌曲等于这个组件歌曲id就高亮即可。

![image-20230427183000105](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230427183000105.png)

![image-20230426135425062](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230426135425062.png)

![image-20230425222145261](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230425222145261.png)

## 5.评论

![image-20230421202451406](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230421202451406.png)

## 6.用户信息（完成）

我的页面和其他用户页面需要

![image-20230421222001881](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230421222001881.png)

在其他用户页面时候需要展示关注按钮，所以使用插槽即可。同时也是响应式的咯~~

点击下列元素可以进行路由跳转。

![image-20230422110617674](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230422110617674.png)

![image-20230422114253757](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230422114253757.png)

```vue
<template>
    <div class="user-infor">
        <n-image :src="avatar" />
        <div class="information">
            <div class="top-infor">
                <!--顶部用户信息-->
                <div>
                    <span class="username">{{ nickname }}</span>
                    <n-icon size="20" :color="gender ? '#4098fc' : 'pink'">
                        <ManOutlinedIcon v-if="gender" />
                        <WomanOutlinedIcon v-else />
                    </n-icon>
                </div>
                <div>
                    <span>Lv.{{ level }}</span>
                    <!--预留的关注按钮-->
                    <slot></slot>
                </div>

            </div>
            <ul>
                <!--用户的其他信息-->
                <UserItem title="动态" :value="eventCount" />
                <UserItem title="关注" :value="follows" />
                <UserItem title="粉丝" :value="followeds" />
            </ul>
            <!--用户简介以及创建天数-->
            <div class="more-infor">
                <span>个人介绍: {{ sigFormat }}</span>
                <span>
                    来到云村{{ createDays }}天了😀
                </span>
            </div>
        </div>

    </div>
</template>
<script lang='ts' setup>
import UserItem from './components/UserItem/UserItem.vue';
import { computed } from 'vue'
import { ManOutlined as ManOutlinedIcon, WomanOutlined as WomanOutlinedIcon } from '@vicons/antd'
/**
 * 格式化用户签名
 */
const sigFormat = computed(() => {
    return props.signature ?
        props.signature :
        '这个人太懒了，简介也不写呢。'
})
/**
 * 用户信息组件的自定义属性
 */
const props = defineProps<{
    avatar: string;
    nickname: string;
    level: number;
    eventCount: number;
    /**
     * 关注
     */
    follows: number;
    /**
     * 粉丝
     */
    followeds: number;
    signature: string;
    /**
     * 真为男
     */
    gender: boolean;
    /**
     * 创建多少天了
     */
    createDays: number
}>()

</script>
<style scoped lang="scss">
.more-infor {
    font-size: 13px;
    display: flex;
    flex-direction: column;
}

.top-infor>div {
    height: 30px;
    display: flex;
    align-items: center;
}

.user-infor {
    display: flex;
    margin-bottom: 20px;

    .username {
        font-size: 25px;
        margin-right: 15px;
    }

    .information {
        width: 100%;
        margin-left: 30px;
    }
}

ul {
    display: flex;
    margin: 10px 0;
    padding: 10px 0;
    border-top: 1px solid var(--box-border-color);
}


@media screen and (max-width:585px) {
    .user-infor {
        align-items: center;
        flex-direction: column;
    }

    :deep(.n-image img) {
        width: 120px;
        border-radius: 50%;
    }

    ul {
        border: none;
        justify-content: space-around;
        margin: 0;

        :deep(li) {
            transform: scale(.9);
        }
    }

    .information {
        padding-top: 10px;
    }
}</style>
```



## 7.二次封装tabBar(已解决，不过只能在一级路由里面使用)

感觉蛮多地方需要用到这个组件，索性封装了。传入自定义属性列表渲染tabBar，点击谁就跳转路由，并设置切换高亮。

​	路由路径切换时，tabBar不能正常显示，我只做了点击tabBar进行路由跳转，但是没有对直接的路由路径进行监听实时高亮某个选项

![image-20230422121330191](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230422121330191.png)

```vue
<template>
    <n-tabs type="segment" @update:value="changeHandler" v-model:value="selectPanel">
        <n-tab v-for="item in list" :name="item.path" v-text="item.title" />
    </n-tabs>
</template>
<script lang='ts' setup>
import TabBarList from './interfaces'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const props = defineProps<{ list: TabBarList }>()

// 根据当前路由路径来初始化选择的标签页
const $route = useRoute()
const $router = useRouter()
// 当前选择的标签页
const selectPanel = ref($route.path)

// 标签页切换时的回调
function changeHandler(value: string) {
    // 路由跳转
    $router.push(value)
    // 设置当前选择的标签
    selectPanel.value = value
}

</script>
<style scoped></style>
```

### 解决路由更新，tabBar不对应高亮的版本

```
<template>
    <n-tabs type="segment" @update:value="changeHandler" v-model:value="selectPanel" style="margin: 10px 0;">
        <n-tab v-for="item in list" :name="item.path" v-text="item.title" />
    </n-tabs>
</template>
<script lang='ts' setup>
import path from 'path'
import TabBarList from './interfaces'
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const props = defineProps<{ list: TabBarList }>()

// 根据当前路由路径来初始化选择的标签页
const $route = useRoute()
const $router = useRouter()
// 当前选择的标签页
const selectPanel = ref($route.path)

// 标签页切换时的回调
function changeHandler(value: string) {
    // 路由跳转
    $router.push(value)
    // 设置当前选择的标签
    selectPanel.value = value
}

// 路由路径发生变化改变选择的标签页  (还可以优化,我这个只要路由发生变化就执行回调)
watch($route, (vNew) => {

    // 获取当前路由路径的组件
    const pathList = vNew.path.split('/')

    if (pathList.length === 4) {
        // 若该路由有动态参数 去除多余的动态参数
        pathList.pop()
    }

    // 去除多余的路径,我们只要二级路由
    pathList.splice(0, 2)

    // 假定我们这个组件只用在一级路由里面,来控制二级路由的切换的话这个解决方式是ok的
    props.list.some(ele => {
        if (ele.path.includes(pathList[0])) {
            selectPanel.value = ele.path
        }
    })


})

</script>


```



## 8.用户的歌单（完成）

​	用户的歌单需要复用。所以需要用户的歌单组件，这个组件是加载更多数据的组件，需要传入uid来加载对应的用户数据。

![image-20230423190450961](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230423190450961.png)

## 9.骨架屏（完成）

​	二次封装的骨架屏，可以传递展示多少个、图片圆角、文字居中等选项

![image-20230423130524885](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230423130524885.png)

## 10.mv（未完成v-once）

​	有个问题，mv的上传者有用户也有歌手，不能点击mv的上传者都跳转到用户页面，会报404错误，是否需要若报了404错误跳转到歌手页面？

![image-20230423131318108](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230423131318108.png)

点击封面跳转mv详情页，点击用户，跳转用户详情页

完工~

![image-20230423190309294](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230423190309294.png)



## 12.歌曲的更多信息（未完成，对应功能未完成）

​	以render函数来渲染，最开始我本来想全局就是使用一个抽屉组件，通过点击歌曲来控制显示和隐藏，但是还需要仓库进行配合，太麻烦了，我就想以函数的形式创建虚拟DOM，将其渲染出来，不过naivieui的抽屉组件感觉用不来，还是自己封装一个组件吧，调用函数即可渲染该抽屉。

​	重大问题：无法获取router，因为该组件没被app控制。如何解决？只能在window里面全局挂载push方法了。

### 	功能

​	1.点击立即播放，将歌曲的基本信息（id、name等等）发送给音乐仓库

​	 2.根据歌曲信息渲染mv链接

​	3.点击歌手，专辑跳转到对应页面

![image-20230427151131891](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230427151131891.png)

## 13.歌曲的下拉菜单（未完成，对应功能未完成）

​	用的组件库，在layout组件中渲染这个组件，当右键song组件时，通过pubsub，将歌曲数据发送过来，并显示该下拉菜单，点击时有对应的功能。 

​	1.点击立即播放，将数据歌曲数据发送给音乐仓库

![image-20230427155455103](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230427155455103.png)

## 14.用户头像

​	点击头像跳转用户页面。若点击的是当前登录的用户则跳转至我的页面

![image-20230428104331847](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230428104331847.png)

## 15.评论区组件

​	评论区组件在歌单、专辑、歌曲评论页中使用的组件。

​	加载对应页的评论，无论是加载第几页的数据，都会展示热评，也就是对查询参数page进行判断，不论是不是第一页都要调用获取第一页的评论接口，来获取热门评论

## 15.5.评论项组件

评论有两个状态，评论，回复，根据 beReplied字段的长度来确定是否有评论。

点击用户头像、用户名称，可以跳转用户页面



## 16.歌曲项组件

​	应该是相似歌曲特供了，可以跳转歌曲，歌手页面，点击播放歌曲

![image-20230428175435587](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230428175435587.png)



# 十二、hooks

#### 	1.我的收藏 分页hooks

​	封装好了

```ts
import { onMounted, reactive, ref, watch } from 'vue'
import useRouteInfor from './useRouteInfor'
import message from '@/utils/message'
import { useRouter } from 'vue-router'
import { countPage } from '@/utils/computed'
/**
 * T为调用接口的返回值,D为数据的类型
 *  获取用户收藏数据钩子
 * @param cb - 获取的api函数 统一需要传入page来获取某一页的数据
 * @param name -路由的名称
 * @returns 
 */
const useStarList = <T, D>(cb: (page: number, limit?: number) => Promise<T>, name: string) => {
    const $router = useRouter()
    // 获取查询参数
    const { $route, params } = useRouteInfor()
    // 根据查询参数初始化页数
    const page = ref(params.page ? + params.page : 1)
    // 一页多少条数据
    const limit = 24
    // 正在加载?
    const isLoading = ref(false)
    /**
     * 总共页数
     */
    let pages = ref(0)
    // 所有数据
    const list = reactive<D[]>([])
    // 还有更多吗?
    const hasMore = ref(true)
    // 请求到空的页数
    const isEmpty = ref(false)

    /**
     * 获取数据的函数
     */
    async function getData() {
        // 设置正在加载
        isLoading.value = true
        const res: any = await cb(page.value)
        hasMore.value = res.hasMore

        // 请求到了空的页数
        if (res.data.length === 0) {
            isEmpty.value = true
            message("请求的页数非法或还没有收藏呢", "warning")
            isLoading.value = false
            return
        }

        if (res.code === 200) {
            // 清空数据
            list.splice(0, list.length)
            res.data.forEach(((ele: any) => {
                list.push(ele)
            }))
            isLoading.value = false
            // 返回总条数
            return res.count
        }

    }

    onMounted(async () => {

        // 判断当前请求页数是否大于1
        if (page.value > 1) {
            // 获取第一页的数据,因为只有请求第一页时才能获得总页数
            const res:any = await cb(1)
            pages.value = countPage(limit, res.count)
            // 获取请求的某一页
            getData()
        } else if (page.value === 1) {
            // 获取到总条数
            const count: number = await getData()
            pages.value=countPage(limit,count)
        } else {
            message("请求参数非法","error")
            isEmpty.value = true
            isLoading.value=false
        }

    })

    // 监听页数发生变化就更新路由
    watch(page, (v) => {
        $router.push({
            name,
            params: {
                page: v
            }
        })
        getData()
    })

    // 路由的动态参数发生变化就更新page的值
    watch(() => $route.params.page, (v) => {
        console.log(v);
        if (v) {
            page.value = +v
        }

    })

    return {
        isLoading,
        page,
        pages,
        list,
        isEmpty
    }
}

export default useStarList

```

#### 2.关注/取消关注，收藏/取消收藏等功能性的hooks

​	接口问题，不方便整。。。主要是接口响应回来的数据都没一个统一的结构。

#### 	3.推荐的歌单、mv、音乐钩子

​	因为他们三响应的内容数据结构都一样，所以可以搞hooks

![image-20230425094535566](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230425094535566.png)

#### 4.歌单、歌曲的评论区钩子

​	他们返回的数据结构是一模一样的，~~所以采用钩子了~~，封装的组件。

#### 5.搜索钩子

​	搜索页面的钩子，因为搜索类别有六种，每个页面逻辑都差不多，一个一个写太累了。

​	对于搜索结果来说，无非就是数据展示，路由查询参数更新时，更新所要展示的数据即可。

​	钩子就收一个处理函数，用来在合适的时机调用（路由参数更新）获取数据，并将数据保存在对于组件中。此钩子主要用来对查询参数更新时进行处理，在统一的获取数据。

​	钩子中的数据，page、total、keywords、isloading

​	在路由组件被渲染时获取搜索结果，路由更新时获取搜索结果，page更新时获取搜索结果



# 十三、api

​	api我是分页面来进行管理模块的，对于多个页面要使用的api、接口我存放在public里面的，public也是分模块的，对于一些公共接口，我存放在public/interfaces里面



# 十四、渲染函数

​	1.歌曲信息抽屉

​	2.模态框组件

​	3.不带状态的模态框组件

​	4.查看大图组件

# n、time

### 4.21

感觉做得好慢啊，哈哈哈，这个月末能做完吗？想想上个月这个时候应该才写完bluecode，然后就开始学react了。。。

![image-20230421224336380](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230421224336380.png)

### 4.22

 css我恨你，恨死你😅😅

![image-20230423131143726](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230423131143726.png)

### 4.23

​	解决了很多bug，果然时间多才好嘛

![image-20230423215630319](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230423215630319.png)

### 4.25

![image-20230425222704639](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230425222704639.png)

### 4.26

昨天课多，晚上又出去吃饭去了的😣

![image-20230427075143249](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230427075143249.png)

### 4.27

今天感觉不在状态，写的东西质量不是很好。完成了歌曲下拉菜单，歌曲信息抽屉，创建了歌曲仓库，搭建了简易播放器，完善了歌曲组件（当前播放的歌曲高亮，不过在无法播放时需要进行处理），对歌单、歌曲接口的编写，歌单详情信息页面的搭建。

![image-20230427222131688](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230427222131688.png)

### 4.28

​	今天感觉写得挺多的，明天回家咯

![image-20230428223027866](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230428223027866.png)

### 4.30 

 五一节唯一写了六个小时。。。

![image-20230502083043408](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230502083043408.png)

### 5.2

​	昨天又耍了一天，今天就写了一个mv页面。。。啥时候能写完啊

![image-20230502212438173](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230502212438173.png)

### 5.3	

​	上午把论文写完了，今天就写了4个页面，不过都比较简单的页面就是了，现在就差发现和搜索页面了

![image-20230503211606836](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230503211606836.png)

### 5.4

​	还差最后一个页面了和音乐播放器了，加油，我感觉起码还有几天时间。。今天只写了一个页面，哈哈哈。。

​	搜索页面做了之后还需要做 在歌曲详情页中有一个将歌曲添加到歌单这个功能，还有就是音乐播放器需要一个音乐播放列表，暂定列表为点击播放歌曲时将歌曲列表全部保存在仓库中，这个列表既可以作为播放列表

![image-20230504210512738](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230504210512738.png)

### 5.6

![image-20230506215605487](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230506215605487.png)

### 5.7

​	今天有点摆烂，不过封装了一个很牛的钩子导致我能够快速的搭建搜索页面的六个子路由，要是没有钩子我真不知道啥时候能写完，明天加油，最好最近几天能完成，三天之内吧。

![image-20230507200201732](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230507200201732.png)

### 5.8

​	今天主要是完善之前写的东西，增加了歌单创建歌单添加歌曲删除歌曲更新歌单名称更新歌单封面等功能，完善了登录页、歌曲抽屉、歌曲下拉菜单等。明天可以写音乐播放器了，应该会用到auido的api吧。

![image-20230508212252683](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230508212252683.png)

### 5.9

​	今天完成了音乐播放器，还是不错，就差逐帧歌词了

![image-20230509211359662](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230509211359662.png)

### 5.10

​	完成~~

![image-20230510152452474](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20230510152452474.png)
