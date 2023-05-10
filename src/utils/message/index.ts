/**
 * 消息提示
 * @param content 
 * @param type 
 * @param afterHandler - 消息弹窗消失后的回调
 * @param icon - 消息的图标
 */
export default function message(content: string, type: "info" | "error" | "warning" | "success" | "loading", afterHandler: any = () => { }, icon?: any) {
    (window as any).$message[type](content, {
        onAfterLeave: afterHandler,
        icon
    })
}
