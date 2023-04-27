/**
 * 检查查询参数页数的合法
 * @param page - 页数
 * @return 正整数正常返回,其他返回1
 */
export function checkPage(page: number) {
    let num = +page
    if (isNaN(num)) {
        // 若参数不合法,重置页数为0
        return 1
    } else {
        // 若是一个数,需要检查是否为整数
        if (num === parseInt(num + '') && num > 0) {
            return num
        } else {
            return 1
        }
    }
}