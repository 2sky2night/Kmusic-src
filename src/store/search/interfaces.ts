/**
 * 搜索仓库的数据源
 */
export interface SearchData {
    history: HistoryItem[];
    keywords: string
}

/**
 * 每一项历史记录
 */
export interface HistoryItem {
    name: string;
    time: number
}