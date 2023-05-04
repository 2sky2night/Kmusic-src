<template>
    <div class="category-panel">
        <n-h3 class="title">
            <div>
                <span style="margin-right: 10px;">歌单分类</span>
                <n-tag  @click="() => toChooseCategory(tags.all.name)" :class="`tag ${currentTag===tags.all.name?'tag-active':''}`" :bordered="false">
                    {{ tags.all.name }}
                </n-tag>
            </div>
            <n-icon size="30" style="cursor: pointer;" @click="closePanel">
                <IosClose />
            </n-icon>
        </n-h3>
        <ul class="first-category">
            <li v-for="key in Object.keys(tags.categoryName)" :key="key">
                <div><span>{{ tags.categoryName[key] }}</span>></div>
                <ul class="second-category">
                    <li v-for="tag in tags.categories[key]" :key="tag.name">
                        <n-tag  :class="`tag ${currentTag === tag.name ? 'tag-active' : ''}`" :bordered="false" @click="() => toChooseCategory(tag.name)">
                            <n-icon color="red" v-if="tag.hot" style="position: relative;top:2px">
                                <FireTwotone />
                            </n-icon>
                            <span>{{ tag.name }}</span>
                        </n-tag>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script lang='ts' setup>
// 接口
import { Tag } from '@/api/Discover/Playlist/interfaces'
// 图标
import { IosClose } from '@vicons/ionicons4'
import { FireTwotone } from '@vicons/antd'

// 自定义属性
const props = defineProps<{
    tags: {
        categories: any;
        categoryName: any;
        all: Tag
    };
    currentTag: string;
}>()

// 自定义事件
const emit = defineEmits<{
    (e: "closePanel"): void;
    (e: "chooseCategory", category: string): void
}>()

/**
 * 关闭表盘
 */
function closePanel() {
    emit("closePanel")
}

/**
 * 选择某个分类 并关闭仪表盘
 */
function toChooseCategory(category: string) {
    emit("chooseCategory", category)
    closePanel()
}


</script>
<style scoped lang="scss">
.title {
    margin: 0;
    display: flex;
    justify-content: space-between;
}

.category-panel {
    background-color: var(--bg-color);
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px 20px;
    width: 80%;
    margin: 20px auto;
}

.second-category {
    display: flex;
    flex-wrap: wrap;
}

.first-category {
    >li {
        display: flex;
        box-sizing: border-box;
        padding: 10px 0;
    }

    >li:not(:last-child) {
        border-bottom: 1px solid var(--box-border-color);
    }

    >li>div {
        margin-right: 10px;
        min-width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>