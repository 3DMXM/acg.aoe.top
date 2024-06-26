import VideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'


export default defineNuxtPlugin((app) => {
    app.vueApp.use(VideoPlayer)
})
