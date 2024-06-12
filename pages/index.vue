<script setup lang="ts">

const useitem = useItem()


</script>
<template>
    <v-btn @click="useitem.getItem">测试</v-btn>

    <v-row>
        <v-col cols="12" v-for="item in useitem.items" :key="item.id">
            <ItemAnimation :item="item"></ItemAnimation>
        </v-col>
    </v-row>

</template>
<script lang='ts'>

export default {
    name: 'Index',
}
</script>
<style lang='less' scoped></style>