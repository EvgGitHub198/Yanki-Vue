import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import axios from 'axios'
import store from './store'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Chart from 'chart.js';
import VueChartJs from 'vue-chartjs';


axios.defaults.baseURL = 'http://127.0.0.1:8000'
createApp(App).use(store).use(router, axios).use(VueChartJs, Chart).use(Toast,{position: "bottom-right", maxToasts: 5, timeout: 1700}).mount('#app')
