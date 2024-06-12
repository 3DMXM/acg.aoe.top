<script lang='ts' setup>
import type { IOneDriveFolderItem } from '~/model/Interfaces'

const prop = defineProps<{
    item: IOneDriveFolderItem
}>()

const useitem = useItem()

let poster = ref('')
useitem.preview(prop.item.id).then((data) => {
    console.log(data);

    poster.value = data.value[0].large.url

})

</script>
<template>
    <VideoPlayer :poster="poster" crossorigin="anonymous" playsinline controls :volume="0.1" :height="320"
        :playback-rates="[0.7, 1.0, 1.5, 2.0]" :sources="[
            {
                src: item['@microsoft.graph.downloadUrl'],
                type: item.file?.mimeType
            }
        ]">
    </VideoPlayer>
</template>
<script lang='ts'>

export default {
    name: 'ItemVideo',
}
</script>
<style lang='less' scoped></style>