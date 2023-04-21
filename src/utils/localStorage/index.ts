export function setLocal(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}
export function getLocal(key: string) {
    const value = localStorage.getItem(key)
    return value === null ? null : JSON.parse(value)
}

