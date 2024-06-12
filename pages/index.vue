<script setup lang="ts">

import axios from 'axios'

definePageMeta({
    layout: 'default'
})

async function getItem() {
    // let items = await fetch('/api/GetList', {
    //     method: 'post',
    //     body: { test: 123 }

    // })

    let res = await axios.post('/api/GetList', { path: "Agc" })

    let items = res.data
    console.log(items);
}

getItem()

</script>
<template>
    <h1>Acg.aoe.top</h1>
</template>
<script lang='ts'>

export default {
    name: 'Index',
}
</script>
<style lang='less' scoped></style>