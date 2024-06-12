import axios from 'axios'
import type { IOneDriveFolderItem } from '~/model/Interfaces'

export const useItem = defineStore('item', {
    state: () => {
        return {
            items: [] as IOneDriveFolderItem[],
            paths: ['2024', '04', '[ANi] ReMonster'] as string[]
        }
    },

    actions: {
        async getItem() {
            axios.post('/api/GetList', { path: this.paths }).then(res => {
                if (res.data.value) {
                    this.items = res.data.value
                } else {
                    ElMessage.error('获取列表失败, 请稍后再试')
                }
            })
        },
        async preview(itemId: string) {
            let res = await axios.post('/api/preview', { itemId })
            return res.data
        },
        async getDataById(itemId: string) {
            let item = this.items.find(item => item.id === itemId)
            if (item) return item
            let res = await axios.post('/api/GetDataById', { itemId })
            return res.data
        }

    }
})