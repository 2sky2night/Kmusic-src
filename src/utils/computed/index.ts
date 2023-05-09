/**
 * 格式化播放量
 * @param value 
 * @returns 
 */
export const countFormat = (value: number) => {
    if (value < 10000) {
        return value
    } else {
        let num = Math.round(value / 10000)
        return num + '万'
    }
}

/**
 * 格式化播放时间为 MM:SS
 * @param value 
 */
export const durationFormat = (value: number) => {
    const seconds = value / 1000
    const minute = Math.round(seconds / 60)
    const second = Math.round(seconds % 60)
    return `${minute > 9 ? minute : '0' + minute}:${second > 9 ? second : '0' + second}`
}

/**
 * 计算出总页数
 * @param limit - 每页多少条
 * @param count - 一共多少条
 */
export const countPage = (limit: number, count: number) => {
    const pagesNum = count / limit
    if (pagesNum === parseInt(pagesNum + '')) {
        // 若为整数,设置总页数
        return pagesNum
    } else {
        // 若不为整数
        return Math.floor(pagesNum) + 1
    }
}

/**
 * 时间戳转换 成 YYYY-MM-DD
 * @param time 
 * @returns 
 */
export const timeFormat = (time: number) => {
    const date = new Date(time)
    return date.toLocaleDateString().replaceAll('/', '-')
}

/**
 * 格式化秒为 MM:SS
 */
export const playingTimeFormat = (value: number) => {
    const second = Math.floor(value % 60);
    const minute = Math.floor(value / 60);
    return `${minute > 9 ? minute : '0' + minute}:${second > 9 ? second : '0' + second}`
}