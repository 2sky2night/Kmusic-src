/**
 * 消息提示
 * @param content 
 * @param type 
 * @param afterHandler - 消息弹窗消失后的回调
 */
export default function message(content: string, type: "info" | "error" | "warning" | "success" | "loading", afterHandler: any = () => { }) {
    (window as any).$message[type](content, {
        onAfterLeave: afterHandler
    })
}
