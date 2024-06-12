import { OneDrive } from "~/model/OneDrive"
import { Config } from "~/model/config"

export default defineEventHandler(async (event: any) => {
    // 获取 post 参数 path 
    const { path } = await readBody(event)

    const { rootPath } = Config.getConfig()

    let parent = rootPath
    if (path.length > 0) {
        parent += "/" + path.join("/")
    }

    let children = await new OneDrive().GetChildren(parent)

    return children
})