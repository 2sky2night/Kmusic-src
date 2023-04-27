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