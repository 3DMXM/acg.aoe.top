import { OneDrive } from "~/model/OneDrive";

export default defineEventHandler(async (event: any) => {

    const response = await OneDrive.GetResponse()

    // 302 跳转到 response
    return {
        status: 302,
        headers: {
            location: response
        }
    }

})