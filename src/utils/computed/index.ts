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
    const secends = value / 1000
    const minute = Math.round(secends / 60)
    const second = Math.round(secends % 60)
    return `${minute}:${second > 9 ? second : '0' + second}`
}