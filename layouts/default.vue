<template>
    <v-app id="inspire">
        <v-app-bar>
            <AppHeader></AppHeader>
        </v-app-bar>
        <v-main>
            <v-container>
                <slot></slot>
            </v-container>
        </v-main>
    </v-app>
</template>
