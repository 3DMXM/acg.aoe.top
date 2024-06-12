<script lang='ts' setup>
import type { IOneDriveFolderItem } from '~/model/Interfaces'
import { useItem } from '~/stores/useItem';

const prop = defineProps<{
    item: IOneDriveFolderItem
}>()

const useitem = useItem()

const show = ref(false)

function preview() {
    useitem.preview(prop.item.id)
}

</script>
<template>
    <v-card>
        <v-card-title>{{ item.name }}</v-card-title>
        <v-card-text v-if="show && item.file?.mimeType.includes('video') && item['@microsoft.graph.downloadUrl']">
            <ItemVideo :item="item"></ItemVideo>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="show = !show">播放</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'ItemAnimation',
}
</script>
<style lang='less' scoped></style>