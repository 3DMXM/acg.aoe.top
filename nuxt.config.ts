import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    build: {
        transpile: ['vuetify'],
    },
    devtools: { enabled: true },
    modules: [
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }))
            })
        },
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    // 自动引入 `defineStore()`
                    'defineStore',
                    // 自动引入 `defineStore()` 并重命名为 `definePiniaStore()`
                    ['defineStore', 'definePiniaStore'],
                ],
            },
        ],
        '@element-plus/nuxt',
    ],
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
    runtimeConfig: {
        public: {
            rootPath: process?.env?.rootPath || '/Acg',
            refreshToken: process?.env?.refreshToken || '',
        },
    },
})
