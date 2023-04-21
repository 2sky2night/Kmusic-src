/**
 * 消息提示
 * @param content 
 * @param type 
 */
export default function message(content: string, type: "info" | "error" | "warning" | "success" | "loading") {
    (window as any).$message[type](content)
}
