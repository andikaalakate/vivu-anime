import { createApp } from 'vue'
import PhosphorIcons from "@phosphor-icons/vue"
import App from './App.vue'
import router from './router'
import '@/global.css'
import 'animate.css'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import InstagramFeed from "vue3-instagram-feed";
import "vue3-instagram-feed/dist/style.css";

const app = createApp(App)

app.use(router)
app.use(PhosphorIcons)
app.use(InstagramFeed)

app.use(VuePlyr, {
    plyr: {}
  })

app.mount('#app')
