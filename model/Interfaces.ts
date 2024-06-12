
export interface IOneDriveFolderItem {
    "@microsoft.graph.downloadUrl"?: string;
    "@odata.etag": string;
    id: string;
    lastModifiedDateTime: string;
    name: string;
    parentReference: {
        driveType: string;
        driveId: string;
        id: string;
        name: string;
        path: string;
        siteId: string;
    };
    folder: {
        childCount: number;
    };
    size: number;
    file?: {
        hashes: {
            quickXorHash: string
        },
        mimeType: string
    }
}
