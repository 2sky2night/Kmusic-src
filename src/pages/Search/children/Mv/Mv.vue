<template>
    <div class="search-tab music-list">
        <ul>
            <MvCard v-for="mv in mvs" :key="mv.id" :cover-url="mv.cover"
                :creators="mv.artists.map(ele => ({ userId: ele.id, userName: ele.name }))" :durationms="mv.duration"
                :play-time="mv.playCount" :title="mv.name" :vid="mv.id" />
        </ul>
        <n-pagination v-if="total / pageSize > 1 && mvs.length && !isLoading" style="align-self: center;" :page-slot="6"
            v-model:page="page" :item-count="total" v-model:page-size="pageSize" show-size-picker :page-sizes="pageSizes">
            <template #prefix>
                共 {{ total }} 项
            </template>
        </n-pagination>
        <EmptyPage v-if="!mvs.length && !isLoading" description="搜索的关键词太犀利了,没有搜索结果呢 🥱" :show-btn="true" />
        <SkeletonList :length="pageSize" :cover-radius="10" :text-center="false" v-if="isLoading" />
    </div>
</template>
<script lang='ts' setup>
// 钩子
import useSearchList from '@/hooks/useSearchList';
import { reactive } from 'vue';
// api
import { getSearchMv } from '@/api/Search/Mv';
// 接口
import { SearchMvItem } from '@/api/Search/interfaces'
// 工具函数
import message from '@/utils/message';


const mvs = reactive<SearchMvItem[]>([])
const { keywords, page, pageSize, pageSizes, isLoading, total } = useSearchList(getMvData)

async function getMvData() {
    mvs.length = 0;
    try {
        const res = await getSearchMv(keywords.value, page.value, pageSize.value);
        if (mvs.length) return;
        if (res.code !== 200) await Promise.reject()
        if (Object.keys(res.result).length === 0) {
            message("搜索结果为空 👀", "info")
            return
        }

        // 获取总数
        total.value = res.result.mvCount;
        // 获取该页的mv数据
        res.result.mvs.forEach(ele => mvs.push(ele))
    } catch (error) {
        message("搜索视频失败 🤩", "warning")
    }
}

</script>
<style scoped></style>