import { createApp } from 'vue'
import App from './App.vue'
import plugins from './plugins'

// 创建app实例
const app = createApp(App)

// 安装自定义插件
app.use(plugins)

// 让app实例渲染到页面中去控制视图
app.mount('#app')
