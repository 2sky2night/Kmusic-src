<template>
    <Transition name="playlist" :appear="render ? false : true">
        <n-card @click.stop="" class="add-song-box" title="添加到歌单" v-if="isShow" :bordered="false" role="dialog"
            aria-modal="true">
            <template #header-extra>
                <n-icon size="30" v-if="render" style="cursor: pointer;" class="text" @click="() => emit('closeBox')">
                    <IosClose />
                </n-icon>
                <n-icon size="30" v-else style="cursor: pointer;" class="text" @click="closePanel">
                    <IosClose />
                </n-icon>
            </template>
            <n-scrollbar style="max-height: 400px">
                <ul>
                    <li @click="showModal = true" style="display: flex;align-items: center;height: 60px;">
                        <div>
                            <n-icon size="50">
                                <IosAdd />
                            </n-icon>
                        </div>
                        <div>新建歌单</div>
                    </li>
                    <li class='playlist-card' @click="() => toAddSong(item.id)"
                        v-for="item in userStore.userData.myPlaylists" :key="item.id">
                        <div>
                            <img :src="item.coverImgUrl + '?param=60y60'">
                            <div>
                                <span>{{ item.name }}</span>
                                <span style="color:var(--text-dark);font-size: 12px;">{{ item.trackCount }} 首</span>
                            </div>
                        </div>

                        <div class="delete-btn" :title="`删除${item.name}`">
                            <n-icon size="20" @click.stop="() => toDeletePlaylist(item.id, item.name)">
                                <DeleteOutlined />
                            </n-icon>
                        </div>

                    </li>
                </ul>
            </n-scrollbar>
            <n-modal v-model:show="showModal">
                <n-card style="width: 60%;max-width:400px" title="新建歌单" :bordered="false" size="small" role="dialog"
                    aria-modal="true">
                    <template #header-extra>
                        <n-icon size="30" style="cursor: pointer;" class="text" @click.stop="showModal = false">
                            <IosClose />
                        </n-icon>
                    </template>
                    <n-input v-model:value="name" placeholder="输入歌单的名称"></n-input>
                    <template #footer>
                        <div style="display: flex;justify-content: end;">
                            <n-button @click.stop="showModal = false" strong secondary size="small"
                                style="margin-right: 10px;">取消</n-button>
                            <n-button @click="toCreatePlaylist" strong secondary size="small" type="primary">确认</n-button>
                        </div>

                    </template>
                </n-card>
            </n-modal>
        </n-card>
    </Transition>
</template>
<script lang='ts' setup>
// api
import { addSongToPlaylist } from '@/api/public/song';
// 钩子
import useUserStore from '@/store/user';
import { ref } from 'vue'
// 图标
import { IosClose } from '@vicons/ionicons4'
// 工具函数
import message from '@/utils/message'
// 图标
import { IosAdd } from '@vicons/ionicons4'
import { DeleteOutlined } from '@vicons/antd'
import messagebox from '@/render/MessageBox';

// 自定义属性
const props = defineProps<{
    /**
     * 要添加的歌曲id
     */
    songId: number;
    /**
     * 以何种方式渲染组件? 真为模板假为函数
     */
    render: boolean;
    closePanel?: () => void
}>()
// 新建歌单的模态框
const showModal = ref(false)
// 创建歌单的名称
const name = ref('')
// 用户仓库
const userStore = useUserStore()
// 自定义事件
const emit = defineEmits<{
    (e: "closeBox"): void
}>()
// 该组件的显示和隐藏
const isShow = ref(true)
// 暴露出去的数据
defineExpose({ isShow })

/**
 * 添加歌曲到歌单
 * @param pid 
 */
async function toAddSong(pid: number) {
    if (!userStore.isLoginState) return message("请先登录 😛", "info")
    try {
        const res = await addSongToPlaylist(pid, props.songId)
        if (res.body.code === 502) {
            return message(res.body.message ? res.body.message : '添加歌曲失败', "info")
        } else if (res.body.code === 200) {
            message("添加歌曲成功 🥰", "success")
            // 更新对应的歌单数据
            userStore.updatePlaylist(pid, "count", res.body.count)
            // 添加成功关闭窗口
            if (props.render) {
                emit('closeBox')
            } else {
                (props as any).closePanel()
            }

        } else {
            await Promise.reject()
        }


    } catch (error) {
        message("添加歌曲失败 🙄", "warning")
    }
}

/**
 * 创建歌单
 */
async function toCreatePlaylist() {
    if (!name.value) return message("歌单名字不能为空 🤷‍♀️", "info");
    await userStore.createPlaylist(name.value);
    showModal.value = false;
    name.value = ''
}

async function toDeletePlaylist(pid: number, name: string) {
    try {
        await messagebox(`确认删除歌单 ${name} 吗?`, "删除歌单")
        userStore.deletePlaylist(pid)
    } catch (error) {
        message("取消删除歌单 😎", "info")
    }

}

</script>
<style scoped lang="scss">
.add-song-box {
    width: 600px;

    ul {
        li:nth-child(1) {
            cursor: pointer;
            border-radius: 10px;
            padding: 10px;
            margin: 0 10px;

            >div:nth-child(1) {
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
            }
        }

        li.playlist-card {
            margin: 0 10px;
            display: flex;
            margin-bottom: 10px;
            transition: .5s;
            transition-property: background-color;
            border-radius: 10px;
            cursor: pointer;
            padding: 10px;
            justify-content: space-between;

            img {
                width: 60px;
                height: 60px;
                border-radius: 10px;
            }

            div.delete-btn {
                align-items: center;
                display: none;
            }

            >div {
                display: flex;

                >div {
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
            }
        }

        li:hover {
            background-color: var(--hover-bg-color);
        }



        li:hover div.delete-btn {
            display: flex;
        }
    }
}

@media screen and (max-width:700px) {
    .add-song-box {
        width: 80%;
    }
}

.playlist-enter-active {
    animation: panelMove 1 .3s ease-in-out;
}

.playlist-leave-active {
    animation: panelMove 1 .3s ease-in-out reverse;
}

@keyframes panelMove {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>