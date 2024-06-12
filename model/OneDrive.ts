import { Config } from "~/model/config";
import { ConfidentialClientApplication, LogLevel } from "@azure/msal-node";

export class OneDrive {

    /**
     * 获取授权链接
     * @returns 
     */
    static async GetResponse() {
        const { token } = Config.getConfig()

        const pca = new ConfidentialClientApplication({
            auth: {
                clientId: token.clientId,
                authority: token.authority,
                clientSecret: token.clientSecret
            },
            system: {
                loggerOptions: {
                    loggerCallback(loglevel, message, containsPii) {
                        console.log(message);
                    },
                    piiLoggingEnabled: false,
                    logLevel: LogLevel.Error,
                }
            }
        })

        const response = await pca.getAuthCodeUrl({
            scopes: token.scopes,
            redirectUri: token.redirectUri,
        })

        return response
    }

    /**
     * 获取refreshToken
     * @param code 
     */
    static async GetRefreshToken(code: string) {
        const { token } = Config.getConfig()

        const url = "https://login.microsoftonline.com/common/oauth2/token";
        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: token.clientId,
                client_secret: token.clientSecret,
                code: code?.toString() || "",
                redirect_uri: token.redirectUri
            })
        })
        let data = await res.json()
        return data
    }

    static async GetAccessToken(refreshToken: string) {
        const { token } = Config.getConfig()

        const url = "https://login.microsoftonline.com/common/oauth2/token";

        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                client_id: token.clientId,
                client_secret: token.clientSecret,
                refresh_token: refreshToken,
                redirect_uri: token.redirectUri,
            })
        })

        let data = await res.json()
        Config.token.accessToken = data.access_token
        Config.token.expires_on = data.expires_on

        return data

    }



    /**
     * 通过目录获取子文件
     * @param path 
     * @returns 
     */
    static async GetChildren(path: string) {
        const { token } = Config.getConfig()
        // 将 path 转换为url编码
        let UrlPath = encodeURIComponent(path);

        const url = `https://graph.microsoft.com/v1.0/me/drive/root:${UrlPath}:/children?select=name,size,folder,@microsoft.graph.downloadUrl,lastModifiedDateTime,id`;

        let res = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token.accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })

        let data = await res.json()

        return data
    }

    /**
     * 通过ID获取文件数据
     * @param fileId 
     * @returns 
     */
    static async GetFileData(fileId: string) {
        const { token } = Config.getConfig()

        const url = `https://graph.microsoft.com/v1.0/me/drive/items/${fileId}/content`;

        let res = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token.accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })

        let data = await res.text()

        return data
    }

}