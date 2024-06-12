import { OneDrive } from "~/model/OneDrive"

export default defineEventHandler(async (event: any) => {
    // 获取 post 参数 path 
    const { path } = await readBody(event)

    let children = await OneDrive.GetChildren(path)

    return children
})