import { OneDrive } from "~/model/OneDrive"

export default defineEventHandler(async (event: any) => {
    // 获取 post 参数 path 
    const { itemId } = await readBody(event)
    let data = await new OneDrive().GetFileDataById(itemId)
    return data
})