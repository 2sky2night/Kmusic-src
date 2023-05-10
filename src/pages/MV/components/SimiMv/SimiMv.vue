<template>
    <div class="simi-mv" v-if="list.length">
        <n-h4 prefix="bar" align-text>
            相似的mv
        </n-h4>
        <ul>
            <MvCard  style="margin-bottom: 10px;" v-for="item in list " :key="item.id" :cover-url="item.cover" :durationms="item.duration"
                :play-time="item.playCount" :vid="item.id + ''" :title="item.name"
                :creators="item.artists.map(ele => ({ userId: ele.id, userName: ele.name }))" />
        </ul>
    </div>
</template>
<script lang='ts' setup>
import { reactive, onMounted, watch } from 'vue'
import { getSimiMv } from '@/api/MV';
import type { MvSort } from '@/api/MV/interfaces';
import message from '@/utils/message';
import MvCard from '@/components/Card/MvCard/MvCard.vue';
// 相似mv列表
const list = reactive<MvSort[]>([])
// 自定义属性
const props = defineProps<{ id: number }>()
// 自定义方法
const emit = defineEmits<{
    (e: 'loadDone'): void
}>()

// 获取数据
onMounted(getData)

/**
 * 获取相似的mv数据
 */
async function getData() {
    try {
        const res = await getSimiMv(props.id)
        res.code !== 200 ? await Promise.reject() : ''
        res.mvs.forEach(ele => {
            list.push(ele)
        })
        // 通知父组件加载完成
        emit("loadDone")
    } catch (error) {
        message("获取相似的mv失败 😪", "error")
    }
}

// 检测动态参数的变化,变化需要重新获取对应mv的评论
watch(() => props.id, () => {
    list.splice(0,list.length)
    getData()
})


</script>
<style scoped>
.simi-mv {
    width: 250px;
    margin-right: 20px;
}

@media screen and (max-width:1000px) {
    .simi-mv {
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        padding-right: 20px;
    }

    .simi-mv ul {
        display: grid;
        grid-template-columns: repeat(3, minmax(0px, 1fr));
        gap: 10px;
    }
}
</style>