<template>
    <div class="search-bar">
        <div class="search-input">
            <n-input v-model:value="keywords" type="text" placeholder="基本的 Input" />
        </div>
        <div class="search-btn">
            <n-button quaternary @click="showModal=true" >
                <n-icon>
                    <SearchIcon/>
                </n-icon>
            </n-button>
            <n-modal style="width:60%" v-model:show="showModal">
                <n-card title="搜索" :bordered="false" role="dialog" aria-modal="true">
                    <n-input v-model:value="keywords" type="text" placeholder="基本的 Input" />
                </n-card>
            </n-modal>
        </div>

    </div>
</template>
<script lang='ts' setup>
import { Search as SearchIcon } from '@vicons/ionicons5'
import { ref } from 'vue'
const showModal = ref(false)
const keywords = ref("")

</script>
<style scoped lang="scss">
.search-bar {
    margin: 0 5px;
}


// 当小于635px时应该编变成一个按钮,点击弹出搜索框即可搜索
@media screen and (max-width:635px) {
    .search-input {
        display: none;
    }


    .search-btn {
        display: block;
    }
}

@media screen and (min-width:636px) {
    .search-input {
        display: show;
    }

    .search-btn {
        display: none;
    }
}
</style>