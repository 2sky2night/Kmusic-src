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