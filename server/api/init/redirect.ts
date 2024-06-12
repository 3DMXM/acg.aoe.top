import { Config } from '~/model/config'
import { OneDrive } from '~/model/OneDrive'


export default defineEventHandler(async (event: any) => {
    // 获取get 参数 code
    const code = getQuery(event).code

    let data = await OneDrive.GetRefreshToken(code?.toString() ?? "")

    return data
})