<template>
    <v-app id="inspire">
        <v-app-bar>
            <BaseHeader></BaseHeader>
        </v-app-bar>
        <v-main>
            <v-container>
                <slot></slot>
            </v-container>
        </v-main>
    </v-app>
</template>
