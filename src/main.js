/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components 
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// import Axios from 'axios'
import routes from './router'
import 'v-calendar/dist/style.css'
import VCalendar from 'v-calendar'
import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3'

// windows.axios = Axios 

const app = createApp(App)

registerPlugins(app)
app.use(routes)
// app.use(Axios)

// Use v-calendar & v-date-picker components
app.use(VCalendar, {
  componentPrefix: 'vc', // Use <vc-calendar /> instead of <v-calendar />
}); 

// RecaptchaV3
app.use(VueReCaptcha, {
  siteKey: '6Le8eLkjAAAAAMphO_MunEcLpB96H_KabcLJLRs9',
  loaderOptions: {
    useRecaptchaNet: true,
    autoHideBadge: true,
  }
});

app.mount('#app')
